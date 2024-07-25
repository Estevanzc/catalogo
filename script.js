var fast_menu = document.getElementById("fast_menu")
var elements_list = document.getElementById("elements_list")
var second_screen = document.getElementById("second_screen")
var genre_select = document.getElementById("genre_select")
var page_type = Number(document.getElementById("back_ground").dataset.page_type)
var details_screen = second_screen.children[0]
var insert_screen = second_screen.children[1]
var insert_screen1 = second_screen.children[4]
var delete_screen = second_screen.children[2]
var obras
var genre
var rating
async function data_taker(action, binds = null) {
    var data_return = await fetch(`http://localhost/catalogo/data_taker.php?action=${action}${binds != null ? `&binds=${encodeURIComponent(JSON.stringify(binds))}` : ``}`)
    console.log(`http://localhost/catalogo/data_taker.php?action=${action}${binds != null ? `&binds=${encodeURIComponent(JSON.stringify(binds))}` : ``}`);
    data_return = await data_return.json()
    switch (action) {
        case 0:
            obras = data_return
            if (page_type == 0) {
                element_constructor()
            }
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
            if (page_type == 1) {
                //console.log("asdasd")
                genre_constructor()
            }
            break;
        case 2:
            rating = data_return
            if (page_type == 2) {
                //console.log("asdasd")
                rating_constructor()
                var select = insert_screen1.children[1].children[0].children[0].children[0].children[1]
                select.innerHTML = `<option value="-1" class="text-black font-bold">Selecione</option>`
                for (var obra of obras) {
                    var option = document.createElement("option")
                    option.value = obra.id
                    option.innerHTML = obra.name
                    option.className = `text-black font-bold`
                    select.appendChild(option)
                }
            }
            break;
        case 3:
            //console.log(data_return)
            break;
        case 7:
            data_taker(0)
            break;
        case 8:
            data_taker(1)
            break;
        case 9:
            data_taker(2)
            break;
    }
}
var first_call = [[1, 2, 0], [0, 2, 1], [0, 1, 2]]
for (var i in first_call[page_type]) {
    data_taker(first_call[page_type][i])
}
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
function genre_insert(element) {
    show_screen(Number(element.dataset.screen_num))
}
function genre_submit(element) {
    if (element.dataset.submit == 1 && element.parentNode.parentNode.children[0].children[1].value != "") {
        var binds = {
            "name": element.parentNode.parentNode.children[0].children[1].value
        }
        data_taker(4, binds)
        data_taker(1)
    }
    element.parentNode.parentNode.children[0].children[1].value = ""
    unshow_screen(3)
}
function obra_insert(element) {
    show_screen(Number(element.dataset.screen_num))
    insert_screen.dataset.insert = element.dataset.insert
    if (Number(element.dataset.insert) == 0) {
        insert_screen.dataset.obra_id = element.parentNode.parentNode.parentNode.dataset.obra_id
        element = obras[Number(element.parentNode.parentNode.parentNode.dataset.obra_id)]
        insert_screen.children[0].children[0].innerHTML = `Editar Obra`
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
    } else {
        insert_screen.children[0].children[0].innerHTML = `Adicionar Obra`
    }
}
function form_submit(element) {
    var title = insert_screen.children[1].children[0].children[0].children[1]
    var select = insert_screen.children[1].children[0].children[2].children[0].children[1]
    var selector0 = insert_screen.children[1].children[0].children[1].children[0].children[1]
    var selector1 = insert_screen.children[1].children[0].children[2].children[1].children[1]
    var selector2 = insert_screen.children[1].children[0].children[2].children[2].children[1]
    var image_input = insert_screen.children[1].children[0].children[1].children[1].children[0]
    var sinopsis = insert_screen.children[1].children[0].children[3].children[1]
    if (element.dataset.submit == 1) {
        if (title.value == "" || select.value == -1 || selector0.dataset.option_num == 1 && image_input.value == "" || sinopsis.value == "") {
            return
        }
        var binds = {
            "name": title.value,
            "image": selector0.dataset.option_num == 1 ? image_input.value : null,
            "sinopsis": sinopsis.value,
            "type": Number(selector1.dataset.option_num),
            "genre_id": select.value,
            "watched": Number(selector2.dataset.option_num)
        }
        if (insert_screen.dataset.insert == 0) {
            binds["id"] = obras[Number(insert_screen.dataset.obra_id)].id
        }
        console.log(binds);
        data_taker(insert_screen.dataset.insert == 0 ? 6 : 3, binds)
        data_taker(0)
    }
    title.value = ""
    select.value = -1
    image_input.value = ""
    sinopsis.innerHTML = ""
    insert_screen.children[1].children[1].children[0].children[0].className = `obra w-48 h-64 flex justify-center items-end cursor-pointer transition-all hover:-translate-y-1 drop-shadow-2xl bg-center bg-no-repeat bg-cover`
    option_change(selector0.children[0])
    option_change(selector1.children[0])
    option_change(selector2.children[0])
    unshow_screen(1)
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
function rating_constructor() {
    elements_list.children[0].children[1].innerHTML = ""
    for (var i in rating) {
        var tr = document.createElement("tr")
        tr.className = `h-8 cursor-pointer transition-all hover:bg-[rgba(255,255,255,0.7)] active:bg-[rgba(255,255,255,0.6)] bg-[rgba(255,255,255,${i % 2 == 0 ? 0.5 : 0.4})]`
        tr.dataset.rating_id = i
        /*tr.addEventListener("click", function () {
            rating_details(this)
        })*/
        var td0 = document.createElement("td")
        var td1 = document.createElement("td")
        var td2 = document.createElement("td")
        var td3 = document.createElement("td")
        var td4 = document.createElement("td")
        td0.className = `w-1/12 text-center font-bold`
        td1.className = `w-1/12 text-center font-bold`
        td2.className = `w-1/12 text-center font-bold`
        td3.className = `w-1/12 text-center`
        td4.className = `w-1/12 text-center`
        td0.innerHTML = rating[i].id
        td1.innerHTML = `${rating[i].note}/10`
        td2.innerHTML = rating[i].obra_id
        var div0 = document.createElement("div")
        var div1 = document.createElement("div")
        var i0 = document.createElement("i")
        var i1 = document.createElement("i")
        i0.className = `fa-solid fa-trash`
        i1.className = `fa-solid fa-pen`
        div0.className = `w-full h-full cursor-pointer transition-all hover:text-blue-500 hover:drop-shadow-2xl hover:shadow-2xl`
        div1.className = `w-full h-full cursor-pointer transition-all hover:text-red-500 hover:drop-shadow-2xl hover:shadow-2xl`
        i0.addEventListener("click", function () {
            rating_delete(this)
        })
        i1.addEventListener("click", function () {
            rating_insert(this)
        })
        i1.dataset.insert = 0
        i1.dataset.screen_num = 4
        i0.dataset.screen_num = 2
        div0.appendChild(i1)
        div1.appendChild(i0)
        td3.appendChild(div0)
        td4.appendChild(div1)
        tr.appendChild(td0)
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        elements_list.children[0].children[1].appendChild(tr)
    }
}
/*
<div class="w-6/12 h-4/6 hidden justify-start items-center flex-col drop-shadow-2xl shadow-2xl backdrop-blur-lg rounded-lg bg-[rgba(0,0,0,0.5)]">
    <div class="w-full h-14 px-5 flex justify-between items-center">
        <div class="text-2xl text-white font-bold drop-shadow-2xl shadow-2xl">Adicionar Avaliação</div>
        <i onclick="rating_submit(this)" id="rating_cancel" data-submit="0" class="fa-solid fa-xmark py-2 px-2.5 border border-solid border-white text-white rounded-full cursor-pointer transition-all hover:bg-red-500 hover:border-0 active:bg-red-400"></i>
    </div>
    <div class="w-full grow flex justify-center items-center">
        <div class="w-8/12 h-full flex justify-start items-center flex-col">
            <div class="w-full h-1/6 flex justify-center items-center">
                <div class="w-4/6 h-full flex justify-center items-center flex-col gap-y-0.5">
                    <label for="" class="self-start ml-11 text-base text-white font-bold">Nome da Obra</label>
                    <select id="genre_select" class="w-10/12 py-1.5 px-2 text-sm text-white rounded drop-shadow-2xl shadow-2xl backdrop-blur outline-none transition-all focus:outline focus:outline-2 focus:outline-white bg-[rgba(255,255,255,0.2)] disabled:opacity-50 border border-solid border-gray-300">
                        <option value="-1" class="text-black font-bold">Selecione</option>
                        <option value="0" class="text-black font-bold">1</option>
                        <option value="1" class="text-black font-bold">2</option>
                        <option value="2" class="text-black font-bold">3</option>
                        <option value="3" class="text-black font-bold">4</option>
                        <option value="4" class="text-black font-bold">5</option>
                    </select>
                </div>
                <div class="w-2/6 h-full flex justify-center items-start flex-col gap-y-0.5">
                    <label for="" class="ml-1 text-base text-white font-bold">Avaliação (0 - 100)</label>
                    <input type="number" id="obra_title" min="0" max="100" name="obra_title" class="w-10/12 h-9 py-1.5 px-2 text-xs text-white drop-shadow-2xl rounded drop-shadow-2xl shadow-2xl backdrop-blur transition-all focus:outline focus:outline-2 focus:outline-white bg-[rgba(255,255,255,0.2)] disabled:opacity-50 border border-solid border-gray-300" value="0">
                </div>
            </div>
            <div class="w-full flex justify-start items-start flex-col pl-5 gap-y-1 grow">
                <label for="" class="ml-2 text-base text-white font-bold">Avaliação Escrita</label>
                <textarea name="" id="" class="w-9/12 h-3/6 py-1.5 px-2 text-xs text-white drop-shadow-2xl rounded drop-shadow-2xl shadow-2xl backdrop-blur transition-all focus:outline focus:outline-2 focus:outline-white bg-[rgba(255,255,255,0.2)] border border-solid border-gray-300" cols="30" rows="10"></textarea>
            </div>
        </div>
        <div class="w-4/12 h-full flex justify-center items-center flex-col">
            <div class="w-full h-2/3 flex justify-center items-center">
                <div class="w-9/12 h-5/6 rounded-lg drop-shadow-2xl shadow-2xl bg-center bg-no-repeat bg-cover"></div>
            </div>
            <div class="w-full h-1/3 flex justify-evenly items-end pb-3">
                <div onclick="rating_submit(this)" id="rating_confirm" data-submit="1" class="w-5/12 h-9 flex justify-center items-center text-white font-bold rounded-sm cursor-pointer transition-all hover:bg-gray-400 hover:border-0 active:bg-gray-500 border border-solid border-gray-300">Salvar</div>
                <div onclick="rating_submit(this)" id="rating_cancel" data-submit="0" class="w-5/12 h-9 flex justify-center items-center text-white font-bold rounded-sm cursor-pointer transition-all hover:bg-gray-400 hover:border-0 active:bg-gray-500 border border-solid border-gray-300">Cancelar</div>
            </div>
        </div>
    </div>
</div>
*/
function rating_insert(element) {
    show_screen(4)
    insert_screen1.dataset.insert = Number(element.dataset.insert)
    var title = insert_screen1.children[0].children[0]
    var select = insert_screen1.children[1].children[0].children[0].children[0].children[1]
    var input = insert_screen1.children[1].children[0].children[0].children[1].children[1]
    var textarea = insert_screen1.children[1].children[0].children[1].children[1]
    var image = insert_screen1.children[1].children[1].children[0].children[0]
    if (element.dataset.insert == 0) {
        insert_screen1.dataset.rating_id = element.parentNode.parentNode.parentNode.dataset.rating_id
        element = rating[Number(element.parentNode.parentNode.parentNode.dataset.rating_id)]
        title.innerHTML = `Editar Avaliação`
        select.value = Number(element.obra_id)
        select.disabled = true
        input.value = Number(element.note) * 10
        textarea.innerHTML = element.observations
        image.classList.add(`bg-[url(${get_element(element.obra_id).image})]`)
    } else {
        title.innerHTML = `Adicionar Avaliação`
    }
}
function rating_submit(element) {
    var title = insert_screen1.children[0].children[0]
    var select = insert_screen1.children[1].children[0].children[0].children[0].children[1]
    var input = insert_screen1.children[1].children[0].children[0].children[1].children[1]
    var textarea = insert_screen1.children[1].children[0].children[1].children[1]
    var image = insert_screen1.children[1].children[1].children[0].children[0]
    if (element.dataset.submit == 1 && select.value != -1 && input.value != "" && textarea.innerHTML != "") {
        var binds = {
            "note": Number(input.value) / 10,
            "obra_id": Number(select.value),
            "observations": textarea.innerHTML
        }
        if (insert_screen1.dataset.insert == 0) {
            binds["id"] = rating[Number(insert_screen1.dataset.rating_id)]
            data_taker(10, binds)
        } else {
            data_taker(5, binds)
        }
        data_taker(2)
    }
    title.innerHTML = ""
    select.value = ""
    select.disabled = false
    input.value = 0
    textarea.innerHTML = ""
    image.className = `w-9/12 h-5/6 rounded-lg drop-shadow-2xl shadow-2xl bg-center bg-no-repeat bg-cover`
}
function switch_image(element) {
    var image = insert_screen1.children[1].children[1].children[0].children[0]
    image.className = `w-9/12 h-5/6 rounded-lg drop-shadow-2xl shadow-2xl bg-center bg-no-repeat bg-cover bg-[url(${get_element(Number(element.value)).image})]`
}
function genre_constructor() {
    elements_list.children[0].children[1].innerHTML = ""
    for (var i in genre) {
        var tr = document.createElement("tr")
        tr.className = `h-8 cursor-pointer transition-all hover:bg-[rgba(255,255,255,0.7)] active:bg-[rgba(255,255,255,0.6)] bg-[rgba(255,255,255,${i % 2 == 0 ? 0.5 : 0.4})]`
        tr.dataset.genre_id = i
        /*tr.addEventListener("click", function () {
            genre_details(this)
        })*/
        var td0 = document.createElement("td")
        var td1 = document.createElement("td")
        var td2 = document.createElement("td")
        var div = document.createElement("div")
        var verifyer = false
        for (var obra of obras) {
            if (obra.genre_id == genre[i].id) {
                verifyer = true
            }
        }
        if (!verifyer) {
            var i0 = document.createElement("i")
            i0.className = `fa-solid fa-trash`
            div.className = `w-full h-full cursor-pointer transition-all hover:text-red-500 hover:drop-shadow-2xl hover:shadow-2xl`
            i0.addEventListener("click", function () {
                genre_delete(this)
            })
            div.appendChild(i0)
        } else {
            div.className = `w-full h-full`
            div.innerHTML = `Já Vinculado`
        }
        td0.className = `w-1/12 text-center font-bold`
        td2.className = `w-2/12 text-center`
        td1.className = `w-9/12 text-center`
        td0.innerHTML = genre[i].id
        td1.innerHTML = genre[i].name
        td2.appendChild(div)
        tr.appendChild(td0)
        tr.appendChild(td1)
        tr.appendChild(td2)
        elements_list.children[0].children[1].appendChild(tr)
    }
}
function genre_delete(element) {
    element = genre[Number(element.parentNode.parentNode.parentNode.dataset.genre_id)]
    var names = ["a obra", "o gênero", "a avalição"]
    show_screen(2)
    delete_screen.dataset.element_id = element.id
    delete_screen.children[0].children[0].innerHTML = `Você deseja deletar ${names[page_type]}`
    delete_screen.children[0].children[1].innerHTML = element.name
}
function element_constructor() {
    //console.log("asdasdasd")
    elements_list.innerHTML = ""
    for (var i in obras) {
        var obra = obras[i]
        var element_space = document.createElement("div")
        element_space.dataset.obra_id = i
        element_space.addEventListener("mouseenter", function () {
            obra_enter(this)
        })
        //console.log(0)
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
        if (!get_element_rating(obra)) {
            console.log("asdasdas")
            var i1 = document.createElement("i")
            i1.addEventListener("click", function () {
                obra_delete(this)
            })
            i1.dataset.screen_num = `2`
            i1.className = `fa-solid fa-trash`
            element_button1.appendChild(i1)
        }
        i0.addEventListener("click", function () {
            obra_insert(this)
        })
        i0.dataset.insert = `0`
        i0.dataset.screen_num = `1`
        element_menu.className = `w-48 h-7 px-5 flex justify-end items-center text-white -translate-y-1 rounded-b-lg bg-zinc-700 transition-all opacity-0`
        element_button0.className = `px-2 h-full cursor-pointer transition-all hover:text-blue-500 hover:bg-zinc-500 active:bg-zinc-400`
        element_button1.className = `px-2 h-full cursor-pointer transition-all hover:text-red-500 hover:bg-zinc-500 active:bg-zinc-400`
        i0.className = `fa-solid fa-pen`
        element_button0.appendChild(i0)
        element_menu.appendChild(element_button0)
        element_menu.appendChild(element_button1)
        element_space.appendChild(element)
        element_space.appendChild(element_menu)
        elements_list.appendChild(element_space)
    }
}
function get_element(id) {
    for (var i in obras) {
        if (obras[i].id == id) {
            return obras[i]
        }
    }
    return false
}
function get_element_genre(element) {
    //console.log(genre)
    for (var i in genre) {
        if (element.genre_id == genre[i].id) {
            return genre[i]
        }
    }
    return false
}
function get_element_rating(element) {
    for (var i in rating) {
        //console.log(`${element.id} ${rating[i].obra_id}`)
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
    //console.log(element.children[0].children[0])
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
function delete_submit(element) {
    console.log(element.parentNode.parentNode);
    if (element.dataset.submit == 1) {
        var binds = {
            "id": element.parentNode.parentNode.dataset.element_id
        }
        data_taker(6 + (page_type + 1), binds)
    }
    unshow_screen(2)
}
function input_verifyer(element) {
    if (element.value == "" && element.dataset.type == 0 || element.value == -1 && element.dataset.type == 1 || element.innerHTML == "" && element.dataset.type == 2) {
        element.classList.add("border-red-500")
    } else if (element.classList.contains("border-red-500")) {
        element.classList.remove("border-red-500")
    }
}
