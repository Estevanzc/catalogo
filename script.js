var obra
var genre
var rating
async function data_taker(action, binds = null) {
    var data_return = await fetch(`http://localhost/catalogo/data_taker.php?action=${action}${binds != null ? `&binds=${JSON.stringify(binds)}` : ``}`)
    data_return = await data_return.json()
    switch (action) {
        case 0:
            obra = data_return
            element_constructor()
            break;
    }
}
data_taker(0)
var fast_menu = document.getElementById("fast_menu")
var elements_list = document.getElementById("elements_list")
function element_constructor() {
    for (var i in obra) {
        var element = obra[i]
        var obra_space = document.createElement("div")
        obra_space.addEventListener("mouseenter", function () {
            obra_enter(this)
        })
        obra_space.addEventListener("mouseleave", function () {
            obra_leave(this)
        })
        obra_space.className = "flex justify-center items-center flex-col px-2 grow"
        var main_element = document.createElement("div")
        var element_desc = document.createElement("div")
        main_element.dataset.bg = element["image"] != null ? 1 : 0
        if (element["image"] != null) {
            main_element.className = `obra w-48 h-64 flex justify-center items-end cursor-pointer transition-all hover:-translate-y-1 drop-shadow-2xl bg-center bg-no-repeat bg-cover bg-[url(${element.image})]`
            element_desc.className = `w-full h-0 px-2 flex justify-start items-start flex-col transition-all overflow-hidden text-white font-bold bg-zinc-800`
        } else {
            main_element.className = `obra w-48 flex justify-center items-end cursor-pointer transition-all hover:-translate-y-1 drop-shadow-2xl`
            element_desc.className = `w-full h-14 py-1 px-2 flex justify-start items-start flex-col overflow-hidden text-white font-bold bg-zinc-800`
        }
        main_element.dataset.element_num = i
        var element_title = document.createElement("div")
        var element_data = document.createElement("div")
        var div0 = document.createElement("div")
        var div1 = document.createElement("div")
        element_title.className = `w-full whitespace-nowrap overflow-hidden text-ellipsis`
        element_title.innerHTML = element.name
        element_data.className = `w-full flex justify-between items-center`
        div0.innerHTML = `(${element.type == 0 ? `Filme` : `Série`})`
        div1.innerHTML = ``/////////////////////////////////
        element_data.appendChild(div0)
        element_data.appendChild(div1)
        element_desc.appendChild(element_title)
        element_desc.appendChild(element_data)
        main_element.appendChild(element_desc)
        var element_menu = document.createElement("div")
        element_menu.className = `w-48 h-7 px-5 flex justify-end items-center -translate-y-1 rounded-b-lg bg-zinc-700 transition-all opacity-0`
        var icon0 = document.createElement("div")
        var icon1 = document.createElement("div")
        icon0.className = `px-2 h-full cursor-pointer transition-all hover:text-blue-500 hover:bg-zinc-500 active:bg-zinc-400`
        icon1.className = `px-2 h-full cursor-pointer transition-all hover:text-red-500 hover:bg-zinc-500 active:bg-zinc-400`
        var i0 = document.createElement("i")
        var i1 = document.createElement("i")
        i0.className = `fa-solid fa-pen`
        i1.className = `fa-solid fa-trash`
        icon0.appendChild(i0)
        icon1.appendChild(i1)
        element_menu.appendChild(icon0)
        element_menu.appendChild(icon1)
        obra_space.appendChild(main_element)
        obra_space.appendChild(element_menu)
        elements_list.appendChild(obra_space)
    }
}
function fmenu(element) {
    if (element.id == "menu_ham") {
        fast_menu.classList.add("w-56")
    } else {
        fast_menu.classList.remove("w-56")
    }
}
function obra_enter(element) {
    console.log(element.children[0].dataset.bg)
    if (element.children[0].dataset.bg == "1") {
        element.children[0].children[0].classList.add("h-56")
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
function option_change(element) {
    element.parentNode.parentNode.dataset.option_num = Number(element.dataset.option_num)
    if (!element.classList.contains("bg-[rgba(255,255,255,0.5)]")) {
        element.classList.add("bg-[rgba(255,255,255,0.5)]")
    }
    if (Number(element.dataset.option_num) == 0) {
        if (element.parentNode.children[1].classList.contains("bg-[rgba(255,255,255,0.5)]")) {
            element.parentNode.children[1].classList.remove("bg-[rgba(255,255,255,0.5)]")
        }
    } else {
        if (element.parentNode.children[0].classList.contains("bg-[rgba(255,255,255,0.5)]")) {
            element.parentNode.children[0].classList.remove("bg-[rgba(255,255,255,0.5)]")
        }
    }
}
