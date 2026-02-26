const API_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://skills-x33b.onrender.com";

// --- 1. CHARGEMENT DES DONNÉES ---
async function chargerCompetences() {
    try {
        const reponse = await fetch(`${API_URL}/themes`);
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
                        <span class="skill-label">${skill.name}</span> 
                        <input type="range" value="${skill.level}" disabled> 
                        <span class="skill-pct">${skill.level}%</span>
                        <button class="delete-btn" title="Supprimer">×</button>
                    `;

                    // Gestion du bouton Supprimer
                    const btnSuppr = li.querySelector(".delete-btn");
                    btnSuppr.addEventListener("click", async () => {
                        if (confirm(`Supprimer la compétence "${skill.name}" ?`)) {
                            try {
                                const res = await fetch(`${API_URL}/skills/${skill.id}`, {
                                    method: "DELETE"
                                });
                                if (res.ok) chargerCompetences();
                            } catch (err) {
                                console.error("Erreur suppression:", err);
                            }
                        }
                    });

                    listElement.appendChild(li);
                });
            }
        });

    } catch (erreur) {
        console.error("Erreur lors du chargement des thèmes :", erreur);
    }
}

// --- 2. GESTION DE L'AJOUT (POST) ---
document.querySelectorAll(".skill-form").forEach(form => {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = form.querySelector(".skill-name").value;
        const level = form.querySelector(".skill-level").value;
        const themes_id = form.dataset.category;

        try {
            const response = await fetch(`${API_URL}/skills`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, level, themes_id })
            });

            if (response.ok) {
                form.reset();
                // On remet l'affichage du % à 50 (valeur par défaut) après reset
                form.querySelector(".range-value").textContent = "50%";
                chargerCompetences();
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout :", error);
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