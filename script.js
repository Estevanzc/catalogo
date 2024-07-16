var fast_menu = document.getElementById("fast_menu")
function fmenu(element) {
    if (element.id == "menu_ham") {
        fast_menu.classList.add("w-56")
    } else {
        fast_menu.classList.remove("w-56")
    }
}
function obra_enter(element) {
    if (element.children[0].dataset.bg == "1") {
        element.children[0].children[0].classList.add("h-14")
        element.children[0].children[0].classList.add("py-1")
    }
    element.children[1].classList.add("opacity-100")
}
function obra_leave(element) {
    if (element.children[0].dataset.bg == "1") {
        element.children[0].children[0].classList.remove("h-14")
        element.children[0].children[0].classList.remove("py-1")
    }
    element.children[1].classList.remove("opacity-100")
}