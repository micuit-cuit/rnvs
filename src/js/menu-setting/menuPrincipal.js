
function parseConfig(menu){
    let html = "";
    for (let i = 0; i < menu.length; i++) {
        const el = menu[i];
        switch (el.type) {
            case "submenu":
                let id = Math.random().toString(36).substring(7)+el.text;
                html += `
                    <div class="submenu menu-item">
                        <input type="checkbox" id="${id}">
                        <label for="${id}" class="submenu-title">
                            <i data-lucide="arrow-down-from-line"> </i>
                            <h2>${el.text}</h2>
                        </label>
                        <div class="submenu-content"> ${parseConfig(el.content)} </div>                
                    </div>
                    `;
                break;
            case "button":
                html += `<button class="menu-item" onclick="${el.onClick}">${el.text}</button>`;
                break;
            case "input":
                html += `<input class="menu-item" type="${el.inputType}" onkeydown="${el.onKeydown}" placeholder="${el.placeholder}" max="${el.max}">`;
                break;
            case "label":
                html += `<label class="menu-item">${el.text}</label>`;
                break;
            case "div":
                html += `<div class="div-content menu-item"> ${parseConfig(el.content)} </div>`;
                break;
            case "hr":
                html += `<hr class="menu-item">`;
                break;
            case "h1":
                html += `<h1 class="menu-item">${el.text}</h1>`;
                break;
            case "h2":
                html += `<h2 class="menu-item">${el.text}</h2>`;
                break;
            case "h3":  
                html += `<h3 class="menu-item">${el.text}</h3>`;
                break;
            case "h4":
                html += `<h4 class="menu-item">${el.text}</h4>`;
                break;
            case "h5":
                html += `<h5 class="menu-item">${el.text}</h5>`;
                break;
            case "h6":
                html += `<h6 class="menu-item">${el.text}</h6>`;
                break;
            case "p":
                html += `<p class="menu-item">${el.text}</p>`;
                break;
            case "span":
                html += `<span class="menu-item">${el.text}</span>`;
                break;
        }
    }
    return html;
}

window.parseConfig = parseConfig;
window.onload = function(){
    const configDrag = document.getElementById("config-drag");
    const transition = document.documentElement.style.getPropertyValue('--transition');
    let active = false;
    configDrag.addEventListener("mousedown", function(e){
        active = true;
        document.documentElement.style.setProperty('--transition', 0);
    })
    document.addEventListener("mousemove", function(e){
        if(active){
            const shiftX = e.clientX;
            const pourcentage = 100-(shiftX) / window.innerWidth * 100
            if(pourcentage > 20 && pourcentage < 50){
                //edit la variable css
                document.documentElement.style.setProperty('--size-config', pourcentage+"vw");
            }
        }
    })
    
    document.addEventListener("mouseup", function(e){
        active = false;
        document.documentElement.style.setProperty('--transition', transition);
        //enregistrer la variable css dans le local storage
        let local = localStorage.getItem("config") || "{}";
        local = JSON.parse(local);
        local.size = document.documentElement.style.getPropertyValue('--size-config');
        localStorage.setItem("config", JSON.stringify(local));
    })
    let config = localStorage.getItem("config") || "{}";
    config = JSON.parse(config);
    if(config.size){
        document.documentElement.style.setProperty('--size-config', config.size);
    }

}