export function creerTremblement() {
    document.body.classList.add("shake");
    setTimeout(() => {document.body.classList.remove("shake")}, 4000);
}