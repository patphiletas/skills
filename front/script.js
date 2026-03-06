const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://skills-x33b.onrender.com";

const statusMessage = document.getElementById("status-message");

function afficherMessage(message, type = "success") {
    if (!statusMessage) return;
    statusMessage.textContent = message;
    statusMessage.style.color = type === "error" ? "#b42318" : "#0b5d57";

    if (message) {
        setTimeout(() => {
            if (statusMessage.textContent === message) {
                statusMessage.textContent = "";
            }
        }, 2800);
    }
}

// --- 1. CHARGEMENT DES DONNÉES ---
async function chargerCompetences() {
    try {
        const reponse = await fetch(`${API_URL}/themes`);
        if (!reponse.ok) throw new Error("Réponse API invalide");
        const themes = await reponse.json();
        
        // On cible les listes <ul>
        const lists = {
          "Backend": document.getElementById("backend-list"),
          "Frontend": document.getElementById("frontend-list"),
          "Graphisme": document.getElementById("graphisme-list")
        };

        // On vide les listes avant de les remplir
        Object.values(lists).forEach(ul => ul.innerHTML = "");

        // 1er forEach : Parcourir les thèmes
        themes.forEach(theme => {
            const listElement = lists[theme.name];

            if (listElement) {
                // 2ème forEach : Parcourir les skills du thème
                theme.skills.forEach(skill => {
                    const li = document.createElement("li");
                    li.className = "skill-item";

                    li.innerHTML = `
                        <div class="skill-row">
                            <span class="skill-label">${skill.name}</span>
                            <span class="skill-pct">${skill.level}%</span>
                            <button class="delete-btn" title="Supprimer">Supprimer</button>
                        </div>
                        <progress class="skill-progress" value="${skill.level}" max="100" aria-label="Niveau ${skill.name}">${skill.level}%</progress>
                    `;

                    // Gestion du bouton Supprimer
                    const btnSuppr = li.querySelector(".delete-btn");
                    btnSuppr.addEventListener("click", async () => {
                        if (confirm(`Supprimer la compétence "${skill.name}" ?`)) {
                            try {
                                const res = await fetch(`${API_URL}/skills/${skill.id}`, {
                                    method: "DELETE"
                                });
                                if (res.ok) {
                                    afficherMessage(`Compétence "${skill.name}" supprimée.`);
                                    chargerCompetences();
                                } else {
                                    afficherMessage("Suppression impossible pour le moment.", "error");
                                }
                            } catch (err) {
                                console.error("Erreur suppression:", err);
                                afficherMessage("Erreur réseau lors de la suppression.", "error");
                            }
                        }
                    });

                    listElement.appendChild(li);
                });

                if (theme.skills.length === 0) {
                    listElement.innerHTML = `<li class="empty-state">Aucune compétence pour le moment.</li>`;
                }
            }
        });

    } catch (erreur) {
        console.error("Erreur lors du chargement des thèmes :", erreur);
        afficherMessage("Impossible de charger les compétences.", "error");
    }
}

// --- 2. GESTION DE L'AJOUT (POST) ---
document.querySelectorAll(".skill-form").forEach(form => {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nameInput = form.querySelector(".skill-name");
        const submitBtn = form.querySelector('button[type="submit"]');
        const name = nameInput.value.trim();
        const level = form.querySelector(".skill-level").value;
        const themes_id = form.dataset.category;

        if (name.length < 2) {
            afficherMessage("Le nom de compétence doit contenir au moins 2 caractères.", "error");
            nameInput.focus();
            return;
        }

        try {
            submitBtn.disabled = true;
            const response = await fetch(`${API_URL}/skills`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, level, themes_id })
            });

            if (response.ok) {
                form.reset();
                // On remet l'affichage du % à 50 (valeur par défaut) après reset
                form.querySelector(".range-value").textContent = "50%";
                afficherMessage(`"${name}" a été ajouté.`);
                chargerCompetences();
            } else {
                afficherMessage("Ajout impossible pour le moment.", "error");
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout :", error);
            afficherMessage("Erreur réseau lors de l'ajout.", "error");
        } finally {
            submitBtn.disabled = false;
        }
    });
});

// --- 3. ANIMATION DES CURSEURS (UI) ---
document.querySelectorAll('.skill-form').forEach(form => {
    const range = form.querySelector('.skill-level');
    const display = form.querySelector('.range-value');

    range.addEventListener('input', () => {
        display.textContent = `${range.value}%`;
    });
});

// --- 4. LANCEMENT INITIAL ---
chargerCompetences();
