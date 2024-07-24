var fast_menu = document.getElementById("fast_menu")
var elements_list = document.getElementById("elements_list")
var second_screen = document.getElementById("second_screen")
var genre_select = document.getElementById("genre_select")
var details_screen = second_screen.children[0]
var insert_screen = second_screen.children[1]
var delete_screen = second_screen.children[2]
var obras
var genre
var rating
async function data_taker(action, binds = null) {
    var data_return = await fetch(`http://localhost/catalogo/data_taker.php?action=${action}${binds != null ? `&binds=${JSON.stringify(binds)}` : ``}`)
    data_return = await data_return.json()
    switch (action) {
        case 0:
            obras = data_return
            element_constructor()
            break;
        case 1:
            genre = data_return
            genre_select.innerHTML = `<option value="-1" class="text-black font-bold">Selecione</option>`
            for (var i in genre) {
                var element = document.createElement("option")
                element.value = genre[i].id
                element.innerHTML = genre[i].name
                element.className = `text-black font-bold`
                genre_select.appendChild(element)
            }
            break;
        case 2:
            rating = data_return
            break;
        case 3:
            console.log(data_return)
            break;
    }
}
data_taker(1)
data_taker(2)
data_taker(0)
/*
<div onmouseenter="obra_enter(this)" onmouseleave="obra_leave(this)" class="flex justify-center items-center flex-col px-2 grow">
    <div data-bg="1" class="obra w-48 h-64 flex justify-center items-end cursor-pointer transition-all hover:-translate-y-1 drop-shadow-2xl bg-center bg-no-repeat bg-cover bg-[url(https://upload.wikimedia.org/wikipedia/pt/2/2f/6875.jpg)]">
        <div class="w-full h-0 px-2 flex justify-start items-start flex-col transition-all overflow-hidden text-white font-bold bg-zinc-800">
            <div class="w-full whitespace-nowrap overflow-hidden text-ellipsis">Bob Esponja</div>
            <div class="w-full flex justify-between items-center">
                <div>(2023)</div>
                <div>10/10</div>
            </div>
        </div>
    </div>
    <div class="w-48 h-7 px-5 flex justify-end items-center -translate-y-1 rounded-b-lg bg-zinc-700 transition-all opacity-0">
        <div class="px-2 h-full cursor-pointer transition-all hover:text-blue-500 hover:bg-zinc-500 active:bg-zinc-400">
            <i class="fa-solid fa-pen"></i>
        </div>
        <div class="px-2 h-full cursor-pointer transition-all hover:text-red-500 hover:bg-zinc-500 active:bg-zinc-400">
            <i class="fa-solid fa-trash"></i>
        </div>
    </div>
</div>
*/
function show_screen(id) {
    //second_screen.children[id].classList.remove("hidden")
    second_screen.classList.remove("hidden")
    second_screen.classList.add("flex")
    second_screen.classList.add("opacity-100")
    second_screen.children[id].classList.remove("hidden")
    second_screen.children[id].classList.add("flex")
    //second_screen.classList.remove("hidden")
}
function unshow_screen(id) {
    //second_screen.children[id].classList.remove("hidden")
    second_screen.classList.remove("flex")
    second_screen.classList.remove("opacity-100")
    second_screen.classList.add("hidden")
    second_screen.children[id].classList.remove("flex")
    second_screen.children[id].classList.add("hidden")
    //second_screen.classList.remove("hidden")
}
function obra_insert(element) {
    show_screen(Number(element.dataset.screen_num))
    insert_screen.dataset.insert = element.dataset.insert
    insert_screen.children[0].children[0].innerHTML = Number(element.dataset.insert) == 0 ? `Editar Obra` : `Adicionar Obra`
    if (Number(element.dataset.insert) == 0) {
        element = obras[Number(element.parentNode.parentNode.parentNode.dataset.obra_id)]
        insert_screen.children[1].children[0].children[0].children[1].value = element.name
        if (element.image != null) {
            option_change(insert_screen.children[1].children[0].children[1].children[0].children[1].children[1])
            insert_screen.children[1].children[0].children[1].children[1].children[0].disabled = false
            insert_screen.children[1].children[0].children[1].children[1].children[0].value = element.image
            insert_screen.children[1].children[1].children[0].children[0].classList.add(`bg-[url(${element.image})]`)
        } else {
            insert_screen.children[1].children[1].children[0].children[0].classList.add("hidden")
        }
        insert_screen.children[1].children[0].children[2].children[0].children[1].value = element.genre_id
        if (element.type == 1) {
            option_change(insert_screen.children[1].children[0].children[2].children[1].children[1].children[1])
        }
        if (element.watched == 1) {
            option_change(insert_screen.children[1].children[0].children[2].children[2].children[1].children[1])
        }
        insert_screen.children[1].children[0].children[3].children[1].innerHTML = element.sinopsis
    }
}
function form_submit(element) {
    if (element.dataset.submit == 1) {
        data_taker(3, {
            "name": insert_screen.children[1].children[0].children[0].children[1].value,
            "image": insert_screen.children[1].children[0].children[1].children[1].children[0].value,
            "sinopsis": insert_screen.children[1].children[0].children[3].children[1].innerHTML,
            "type": Number(insert_screen.children[1].children[0].children[2].children[1].children[1].dataset.option_num),
            "genre_id": insert_screen.children[1].children[0].children[2].children[0].children[1].value,
            "watched": Number(insert_screen.children[1].children[0].children[2].children[2].children[1].dataset.option_num)
        })////////////////////////////////////////////////////////////////////////
    }
}
function element_details(element) {
    show_screen(Number(element.dataset.screen_num))
    element = obras[Number(element.parentNode.dataset.obra_id)]
    details_screen.children[1].children[0].children[0].classList.add(element.image != null ? `bg-[url(${element.image})]` : `invisible`)
    details_screen.children[1].children[1].children[0].children[0].innerHTML = element.name
    details_screen.children[1].children[1].children[1].children[0].innerHTML = `<strong>Tipo:</strong> ${element.type == 0 ? `Filme` : `Série`}`
    details_screen.children[1].children[1].children[1].children[1].innerHTML = `<strong>Status:</strong> ${element.watched == 0 ? `Não assitido` : `Assitido`}`
    details_screen.children[1].children[1].children[2].children[0].innerHTML = `<strong>Gênero:</strong> ${get_element_genre(element).name}`
    var rate = get_element_rating(element)
    if (rate) {
        details_screen.children[1].children[1].children[3].children[1].children[0].style.width = `${rate.note * 10}%`
    } else {
        details_screen.children[1].children[1].children[3].classList.add("hidden")
    }
    details_screen.children[1].children[1].children[4].innerHTML = element.sinopsis
}
function close_details(element) {
    details_screen.children[1].children[0].children[0].className = `w-5/6 h-4/6 flex justify-center items-center rounded-lg drop-shadow-2xl shadow-2xl bg-cover bg-center bg-no-repeat bg-[url(https://upload.wikimedia.org/wikipedia/pt/2/2f/6875.jpg)]`
    if (details_screen.children[1].children[1].children[3].classList.contains("hidden")) {
        details_screen.children[1].children[1].children[3].classList.remove("hidden")
    }
    unshow_screen(0)
}
function element_constructor() {
    elements_list.innerHTML = ""
    for (var i in obras) {
        var obra = obras[i]
        var element_space = document.createElement("div")
        element_space.dataset.obra_id = i
        element_space.addEventListener("mouseenter", function () {
            obra_enter(this)
        })
        element_space.addEventListener("mouseleave", function () {
            obra_leave(this)
        })
        element_space.className = `flex justify-center items-center flex-col px-2 grow`
        var element = document.createElement("div")
        var element_desc = document.createElement("div")
        element.dataset.screen_num = `0`
        element.addEventListener("click", function () {
            element_details(this)
        })
        if (obra.image != null) {
            element.dataset.bg = 1
            element.className = `obra w-48 h-64 flex justify-center items-end cursor-pointer transition-all hover:-translate-y-1 drop-shadow-2xl bg-center bg-no-repeat bg-cover bg-[url(${obra.image})]`
            element_desc.className = `w-full h-0 px-2 flex justify-start items-start flex-col transition-all overflow-hidden text-white font-bold bg-zinc-800`
        } else {
            element.dataset.bg = 0
            element.className = `obra w-48 flex justify-center items-end cursor-pointer transition-all hover:-translate-y-1 drop-shadow-2xl`
            element_desc.className = `w-full h-14 py-1 px-2 flex justify-start items-start flex-col overflow-hidden text-white font-bold bg-zinc-800`
        }
        var element_title = document.createElement("div")
        var element_desc1 = document.createElement("div")
        var element_type = document.createElement("div")
        var element_rating = document.createElement("div")
        element_title.className = `w-full whitespace-nowrap overflow-hidden text-ellipsis`
        element_desc1.className = `w-full flex justify-between items-center`
        element_title.innerHTML = obra.name
        var element_rate = get_element_rating(obra)
        if (element_rate) {
            element_rating.innerHTML = `${element_rate.note}/10`
        }
        element_type.innerHTML = obra.type == 0 ? `Filme` : `Série`
        element_desc1.appendChild(element_type)
        element_desc1.appendChild(element_rating)
        element_desc.appendChild(element_title)
        element_desc.appendChild(element_desc1)
        element.appendChild(element_desc)
        var element_menu = document.createElement("div")
        var element_button0 = document.createElement("div")
        var element_button1 = document.createElement("div")
        var i0 = document.createElement("i")
        var i1 = document.createElement("i")
        i0.addEventListener("click", function () {
            obra_insert(this)
        })
        i1.addEventListener("click", function () {
            obra_delete(this)
        })
        i0.dataset.insert = `0`
        i0.dataset.screen_num = `1`
        i1.dataset.screen_num = `2`
        element_menu.className = `w-48 h-7 px-5 flex justify-end items-center text-white -translate-y-1 rounded-b-lg bg-zinc-700 transition-all opacity-0`
        element_button0.className = `px-2 h-full cursor-pointer transition-all hover:text-blue-500 hover:bg-zinc-500 active:bg-zinc-400`
        element_button1.className = `px-2 h-full cursor-pointer transition-all hover:text-red-500 hover:bg-zinc-500 active:bg-zinc-400`
        i0.className = `fa-solid fa-pen`
        i1.className = `fa-solid fa-trash`
        element_button0.appendChild(i0)
        element_button1.appendChild(i1)
        element_menu.appendChild(element_button0)
        element_menu.appendChild(element_button1)
        element_space.appendChild(element)
        element_space.appendChild(element_menu)
        elements_list.appendChild(element_space)
    }
}
function get_element_genre(element) {
    console.log(genre)
    for (var i in genre) {
        if (element.genre_id == genre[i].id) {
            return genre[i]
        }
    }
    return false
}
function get_element_rating(element) {
    for (var i in rating) {
        console.log(`${element.id} ${rating[i].obra_id}`)
        if (element.id == rating[i].obra_id) {
            return rating[i]
        }
    }
    return false
}
function fmenu(element) {
    if (element.id == "menu_ham") {
        fast_menu.classList.add("w-56")
    } else {
        fast_menu.classList.remove("w-56")
    }
}
function obra_enter(element) {
    //console.log(element.children[0].children[0])
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
function option_change(element) {
    element.parentNode.dataset.option_num = Number(element.dataset.option_num)
    if (!element.classList.contains("bg-[rgba(255,255,255,0.5)]")) {
        element.classList.add("bg-[rgba(255,255,255,0.5)]")
    }
    if (Number(element.dataset.option_num) == 0) {
        if (element.parentNode.children[1].classList.contains("bg-[rgba(255,255,255,0.5)]")) {
            element.parentNode.children[1].classList.remove("bg-[rgba(255,255,255,0.5)]")
        }
        if (element.parentNode.id == "image_selector") {
            element.parentNode.parentNode.parentNode.children[1].children[0].disabled = true
            var element_background = element.parentNode.parentNode.parentNode.parentNode.parentNode.children[1].children[0].children[0]
            if (!element_background.classList.contains("invisible")) {
                element_background.classList.add("invisible")
            }
        }
    } else {
        if (element.parentNode.children[0].classList.contains("bg-[rgba(255,255,255,0.5)]")) {
            element.parentNode.children[0].classList.remove("bg-[rgba(255,255,255,0.5)]")
        }
        if (element.parentNode.id == "image_selector") {
            element.parentNode.parentNode.parentNode.children[1].children[0].disabled = false
            var element_background = element.parentNode.parentNode.parentNode.parentNode.parentNode.children[1].children[0].children[0]
            if (element_background.classList.contains("invisible")) {
                element_background.classList.remove("invisible")
            }
        }
    }
}
function image_selector(element) {
    var element_background = element.parentNode.parentNode.parentNode.parentNode.children[1].children[0].children[0]
    element_background.className = `w-9/12 h-5/6 rounded-lg drop-shadow-2xl shadow-2xl bg-center bg-no-repeat bg-cover bg-[url(${element.value})]`
}
