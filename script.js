const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const reveals = document.querySelectorAll(".reveal");

if (reducedMotion) {
    reveals.forEach((item) => item.classList.add("visible"));
} else {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: .14 });
    reveals.forEach((item) => observer.observe(item));

    document.querySelectorAll(".embers").forEach((field) => {
        const createEmber = () => {
            const ember = document.createElement("i");
            ember.className = "ember";
            ember.style.left = `${Math.random() * 100}%`;
            ember.style.setProperty("--drift", `${-80 + Math.random() * 160}px`);
            ember.style.animationDuration = `${5 + Math.random() * 5}s`;
            ember.style.opacity = `${.25 + Math.random() * .65}`;
            field.appendChild(ember);
            ember.addEventListener("animationend", () => ember.remove());
        };
        let emberInterval = null;
        const emberFieldObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !emberInterval) {
                    emberInterval = setInterval(createEmber, 320);
                } else if (!entry.isIntersecting && emberInterval) {
                    clearInterval(emberInterval);
                    emberInterval = null;
                }
            });
        });
        emberFieldObserver.observe(field);
    });

    addEventListener("scroll", () => {
        const image = document.querySelector(".hero-image");
        if (scrollY < innerHeight) image.style.translate = `0 ${scrollY * .12}px`;
    }, { passive: true });
}

const storySection = document.querySelector("#historia");
const storyTitle = document.querySelector(".story-copy h2");
let storyTitleChanged = false;

const storySectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && !storyTitleChanged) {
            setTimeout(() => {
                activateTransition(storySection);
                storyTitle.innerHTML = "Duas vidas<br><em>Se cruzaram.</em>";
                storyTitle.classList.remove("title-changing");
                void storyTitle.offsetWidth;
                storyTitle.classList.add("title-changing");
                const storyParagraphs = storySection.querySelectorAll(".story-copy > p");
                storyParagraphs[0].textContent = "Uma garota e um rapaz se conheceram e se perderam em horas de conversa. Para ele, ela é a pessoa mais deslumbrante que seus olhos já viram. A conexão foi tão leve e agradável que o rapaz sentiu que poderia passar a vida inteira ali, vivendo naquele único diálogo.";
                storyParagraphs[1]?.remove();
                const newStoryTags = ["A vida tomou seu rumo", "Ambos viveram", "E agora se encontraram"];
                storySection.querySelectorAll(".story-tags span").forEach((tag, index) => {
                    tag.textContent = newStoryTags[index];
                });
                const storyCopy = storySection.querySelector(".story-copy");
                storyCopy.classList.remove("story-text-changing");
                void storyCopy.offsetWidth;
                storyCopy.classList.add("story-text-changing");
                storyTitleChanged = true;
                storySectionObserver.disconnect();
            }, 1000);
        }
    });
}, { threshold: .35 });
storySectionObserver.observe(storySection);

document.querySelector("[data-trailer]").addEventListener("click", () => {
    storySection.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
});

const charactersSection = document.querySelector("#personagens");
const charactersTitle = charactersSection.querySelector(".section-title h2");
const charactersObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                activateTransition(charactersSection);
                charactersTitle.textContent = "E Agora?";
                charactersTitle.classList.remove("title-changing");
                void charactersTitle.offsetWidth;
                charactersTitle.classList.add("title-changing");
                const characterNames = charactersSection.querySelectorAll(".character h3");
                ["Ele", "Ela"].forEach((name, index) => {
                    characterNames[index].textContent = name;
                    characterNames[index].classList.remove("name-changing");
                    void characterNames[index].offsetWidth;
                    characterNames[index].classList.add("name-changing");
                });
                const characterDescriptions = charactersSection.querySelectorAll(".character p");
                const newDescriptions = [
                    "Está tentando fazer o que não fez antes...",
                    "Está cada dia mais linda e hoje parece amanhã rsrsrs (risos)"
                ];
                characterDescriptions.forEach((description, index) => {
                    description.textContent = newDescriptions[index];
                    description.classList.remove("content-changing");
                    void description.offsetWidth;
                    description.classList.add("content-changing");
                });
            }, 2000);
            charactersObserver.disconnect();
        }
    });
}, { threshold: .35 });
charactersObserver.observe(charactersSection);

const destinySection = document.querySelector(".destiny");
const themesContainer = destinySection.querySelector(".themes");
let destinyChanged = false;

const destinyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting && !destinyChanged) {
            setTimeout(() => {
                activateTransition(destinySection);
                themesContainer.classList.add("quote-mode");
                themesContainer.innerHTML = "<span class=\"destiny-date\" aria-hidden=\"true\">11/04/2004</span><blockquote class=\"destiny-quote\">“Eu nunca confiei na sorte ou no destino. Mas se o destino colocou você no meu caminho, eu lutarei contra o próprio céu para mantê-la a salvo.”</blockquote>";
                themesContainer.querySelector(".destiny-date").classList.add("date-visible");
                themesContainer.querySelector(".destiny-quote").classList.add("quote-changing");
                destinyChanged = true;
                destinyObserver.disconnect();
            }, 1500);
        }
    });
}, { threshold: .35 });
destinyObserver.observe(destinySection);

function activateTransition(section) {
    section.classList.remove("transition-burst");
    void section.offsetWidth;
    section.classList.add("transition-burst");

    if (reducedMotion) return;
    for (let index = 0; index < 30; index += 1) {
        const mote = document.createElement("i");
        mote.className = "magic-mote";
        mote.style.left = `${35 + Math.random() * 30}%`;
        mote.style.top = `${35 + Math.random() * 30}%`;
        mote.style.setProperty("--mx", `${-260 + Math.random() * 520}px`);
        mote.style.setProperty("--my", `${-190 + Math.random() * 380}px`);
        mote.style.setProperty("--life", `${1.8 + Math.random() * 2}s`);
        section.appendChild(mote);
        mote.addEventListener("animationend", () => mote.remove());
    }
    setTimeout(() => section.classList.remove("transition-burst"), 3600);
}

const welcomeModal = document.querySelector(".welcome-modal");
const welcomeButton = document.querySelector(".welcome-enter");
const heartTransition = document.querySelector(".heart-transition");
const musicDock = document.querySelector(".music-dock");
const musicToggle = document.querySelector(".music-toggle");
let spotifyController;
let musicRequested = false;
let musicPaused = false;
let musicRestarting = false;

window.onSpotifyIframeApiReady = (IFrameAPI) => {
    const playerElement = document.querySelector("#spotify-player");
    IFrameAPI.createController(playerElement, {
        width: 1,
        height: 1,
        uri: "spotify:track:2MBoyqhDx1pwT4D8GAVBCy"
    }, (controller) => {
        spotifyController = controller;
        if (musicRequested) spotifyController.play();
        spotifyController.addListener("playback_started", () => {
            musicPaused = false;
            musicDock.classList.remove("paused");
        });
        spotifyController.addListener("playback_update", (event) => {
            musicPaused = event.data.isPaused;
            musicDock.classList.toggle("paused", musicPaused);
            const remaining = event.data.duration - event.data.position;
            if (musicRequested && event.data.duration > 0 && remaining <= 1200 && !musicRestarting) {
                musicRestarting = true;
                spotifyController.seek(0);
                spotifyController.play();
                setTimeout(() => {
                    musicRestarting = false;
                }, 1800);
            }
        });
    });
};

setTimeout(() => {
    welcomeModal.classList.add("show");
    welcomeModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    setTimeout(() => welcomeButton.focus(), reducedMotion ? 0 : 1900);
}, 3000);

const closeWelcome = () => {
    const heroTitle = document.querySelector(".hero-title");
    heroTitle.innerHTML = 'Quero que você <em> se sinta especial todos os dias.</em><span>Como a personagem principal de um Dorama</span>';
    heroTitle.classList.add("personalized");
    heroTitle.classList.remove("hero-title-changing");
    void heroTitle.offsetWidth;
    heroTitle.classList.add("hero-title-changing");
    musicRequested = true;
    musicDock.classList.add("show");
    musicDock.setAttribute("aria-hidden", "false");
    if (spotifyController) spotifyController.play();
    welcomeModal.classList.add("closing");
    heartTransition.classList.add("show");
    setTimeout(() => heartTransition.classList.remove("show"), reducedMotion ? 0 : 3600);
    setTimeout(() => {
        welcomeModal.classList.remove("show", "closing");
        welcomeModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }, reducedMotion ? 0 : 1400);
};

welcomeButton.addEventListener("click", closeWelcome);
musicToggle.addEventListener("click", () => {
    if (!spotifyController) return;
    spotifyController.togglePlay();
    musicPaused = !musicPaused;
    musicDock.classList.toggle("paused", musicPaused);
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && welcomeModal.classList.contains("show")) closeWelcome();
});

const declarationButton = document.querySelector("#declaration-yes");
declarationButton.addEventListener("click", () => {
    activateTransition(document.querySelector(".final"));
    declarationButton.innerHTML = "<span>♥</span> Combinado. Mal posso esperar.";
    declarationButton.disabled = true;
}, { once: true });
