console.log("%c Sheepy", "font-size: 10vh; color: #e033ff")
console.log("%c Thanks for using Sheepy!", "color: lime")
console.log("%c Sheepy is part of the SenOS Project.", "color: lime")
console.log("%c Copyright (c) 2020-2021 SenOS.xyz. All rights reserved.", "color: red")

const bootstrapCSSURL = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css";
const bootstrapCSSIntegrity = "sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6";
const bootstrapCSSCrossOrigin = "anonymous";
const bootstrapBundleURL = "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js";
const bootstrapBundleIntegrity = "sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf";
const bootstrapBundleCrossOrigin = "anonymous";
const animateCSSURL = "https://cdn.senos.xyz/animate.css/dist/animate.min.css"

let o = {};

let sheepyActive = false;
let currentStep = 0;

function sheepyInit(options){
    options.steps.splice(0, 0, {title: "Hallo!", content: "Ich bin Sheepy und erkläre dir nun diese Anwendung! Wenn du willst, dass ich still bin musst du nur nochmal auf mich klicken!"});
    o = options;
    installSheepyCSS();
    createSheepyButton();
    loadLibraries();
    addEventListeners();
    if(o.open.includes("FIRST_START") && getCookie("sheepyFirstOpen") === null){
        callSheepy();
        setCookie("sheepyFirstOpen", "NO", 3000)
    }
}

function createSheepyButton(){
    let main = document.createElement('div');
    main.id = "sheepy";

    let buttonRoot = document.createElement('div');

    buttonRoot.id = 'sheepyButtonRoot'

    let sheepyHelp = document.createElement('div');
    sheepyHelp.id = 'sheepyHelp';
    sheepyHelp.innerText = 'Sheepy';

    let sheepyButton = document.createElement('div');
    sheepyButton.id = "sheepyButton";
    let sheepyButtonContent = document.createElement('div');
    sheepyButtonContent.id = "sheepyButtonContent";
    let sheepyLogo = document.createElement('img');
    sheepyLogo.src = 'https://cdn.senos.xyz/sheepy/1.0/dist/img/sheepy-logo.png';
    sheepyLogo.setAttribute('width','100%');
    sheepyLogo.setAttribute('height', '100%');

    sheepyButtonContent.appendChild(sheepyLogo);
    sheepyButton.appendChild(sheepyButtonContent);

    buttonRoot.appendChild(sheepyHelp);
    buttonRoot.appendChild(sheepyButton);

    let sheepyText = document.createElement('div');
    sheepyText.id = 'sheepyText';
    let sheepyStepTitle = document.createElement('h2');
    sheepyStepTitle.id = 'sheepyStepTitle';
    let sheepyStepContent = document.createElement('p');
    sheepyStepContent.id = 'sheepyStepContent';

    let btnDiv = document.createElement('div');
    btnDiv.style.display = 'inline'
    let nextButton = document.createElement('button');
    let previousButton = document.createElement('button');
    nextButton.classList.add('btn', 'btn-primary');

    let contentButtonDiv = document.createElement('div');
    contentButtonDiv.classList.add('text-center')
    let contentButton = document.createElement('button');
    contentButtonDiv.style.display = 'inline'
    contentButton.style.fontSize = '2vh';
    contentButtonDiv.id = 'sheepyTextContentButton'
    contentButton.innerText = 'Inhalt'
    contentButton.classList.add('btn', 'btn-primary');
    contentButton.setAttribute('onclick', 'showSteps()');

    let speakButton = document.createElement('button');
    speakButton.style.fontSize = '2vh';
    speakButton.innerText = 'Text sprechen'
    speakButton.classList.add('btn', 'btn-primary');
    speakButton.style.margin = "1%"
    speakButton.setAttribute('onclick', 'speakCurrentStep()');

    contentButtonDiv.appendChild(contentButton)
    contentButtonDiv.appendChild(speakButton);

    nextButton.id = 'sheepyTextNextButton'
    nextButton.style.float = 'right';
    nextButton.style.fontSize = '2vh'
    previousButton.style.fontSize = '2vh'
    previousButton.classList.add('btn', 'btn-primary')
    previousButton.id = 'sheepyTextPreviousButton'
    nextButton.innerText = 'Vor';
    previousButton.innerText = 'Zurück';
    nextButton.style.display = 'none';
    previousButton.style.display = 'none';

    // btnDiv.appendChild(contentButton);
    btnDiv.appendChild(contentButtonDiv);
    btnDiv.appendChild(nextButton);
    btnDiv.appendChild(previousButton);

    sheepyText.appendChild(sheepyStepTitle);
    sheepyText.appendChild(sheepyStepContent);
    sheepyText.appendChild(btnDiv);


    main.appendChild(buttonRoot)
    main.appendChild(sheepyText)
    document.body.appendChild(main);
}


function installSheepyCSS(){
    let sheepyCSS = document.createElement('link');
    sheepyCSS.rel = 'stylesheet';
    sheepyCSS.href = 'https://cdn.senos.xyz/sheepy/1.0/dist/css/sheepy.min.css'
    document.head.prepend(sheepyCSS)
    if(!isSheetLoaded(animateCSSURL)){
        let animateCSS = document.createElement('link');
        animateCSS.rel = 'stylesheet';
        animateCSS.href = animateCSSURL;
        document.head.prepend(animateCSS)
    }
}

function isSheetLoaded(url){
    for (let i=0; i<document.styleSheets.length; i++) {
        let sheet = document.styleSheets[i];
        if (sheet.href === url) {
            return true;
        }
    }
    return false
}

function loadLibraries(){
    try {
        if(bootstrap){}
    }catch {
        let bootstrapCSS = document.createElement("link");
        let bootstrapScript = document.createElement("script");
        bootstrapScript.src = bootstrapBundleURL;
        bootstrapScript.integrity = bootstrapBundleIntegrity;
        bootstrapScript.crossOrigin = bootstrapBundleCrossOrigin;
        bootstrapCSS.rel = 'stylesheet';
        bootstrapCSS.href = bootstrapCSSURL;
        bootstrapCSS.integrity = bootstrapCSSIntegrity;
        bootstrapCSS.crossOrigin = bootstrapCSSCrossOrigin;
        document.head.prepend(bootstrapCSS);
        document.head.prepend(bootstrapScript);

    }
}

function addEventListeners(){
    document.getElementById('sheepyButton').addEventListener('mouseenter', (event) => {
        document.getElementById('sheepyHelp').style.display = 'block'
    })
    document.getElementById('sheepyButton').addEventListener('mouseleave', (event) => {
        document.getElementById('sheepyHelp').style.display = 'none'
    })
    document.getElementById('sheepyButtonRoot').addEventListener('click', (event) => {
        callSheepy();
    })
}

function callSheepy(){
    if(!sheepyActive){
        currentStep = 0;
        document.getElementById('sheepyText').className = ""
        document.getElementById('sheepyText').classList.add('animation', 'animation-fast', 'animation-fadeIn-right')
        document.getElementById('sheepyText').style.display = 'block';
        showStep(currentStep)
        currentStep++;
        sheepyActive = true;
    }else {
        currentStep = 0;
        document.getElementById('sheepyText').className = ""
        document.getElementById('sheepyText').classList.add('animation', 'animation-fast', 'animation-fadeOut-right')
        setTimeout(() => {
            document.getElementById('sheepyText').style.display = 'none'
            sheepyActive = false;
        }, 2000)
    }
}

function showStep(step){
    currentStep = step;
    document.getElementById('sheepyTextPreviousButton').style.display = 'none'
    document.getElementById('sheepyTextNextButton').style.display = 'none'
    document.getElementById('sheepyTextContentButton').style.display = 'block'
    document.getElementById('sheepyStepTitle').innerText = o.steps[step].title;
    document.getElementById('sheepyStepContent').innerText = o.steps[step].content;
    if(currentStep !== 0){
        document.getElementById('sheepyTextPreviousButton').style.display = 'block'
        document.getElementById('sheepyTextPreviousButton').setAttribute('onclick', 'showStep(' + (currentStep - 1) + ')')
    }
    if(currentStep + 1 !== o.steps.length){
        document.getElementById('sheepyTextNextButton').style.display = 'block'
        document.getElementById('sheepyTextNextButton').setAttribute('onclick', 'showStep(' + (currentStep + 1) + ')')
    }
}

function showSteps(){
    document.getElementById('sheepyTextPreviousButton').style.display = 'none';
    document.getElementById('sheepyTextContentButton').style.display = 'none'
    document.getElementById('sheepyTextNextButton').style.display = 'none';
    document.getElementById('sheepyStepTitle').innerText = 'Inhalt'
    document.getElementById('sheepyStepContent').innerHTML = '';
    let listRoot = document.createElement('ul');
    listRoot.classList.add('list-group')
    for(let i = 0; i < o.steps.length; i++){
        let li = document.createElement('li');
        let a = document.createElement('a');
        a.setAttribute('href', 'javascript:showStep(' + i + ')')
        a.innerText = o.steps[i].title;
        li.appendChild(a);
        li.classList.add('list-group-item')
        listRoot.appendChild(li)
    }
    document.getElementById('sheepyStepContent').appendChild(listRoot);
}

// tts

async function speakCurrentStep(){
    // speak title
    await speak(document.getElementById('sheepyStepTitle').innerText);
    // speak content
    await speak(document.getElementById('sheepyStepContent').innerText)
}

function speak(text){
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.volume = 1;
    msg.lang = "de-DE";
    msg.rate = 1;
    msg.pitch = 1;
    speechSynthesis.speak(msg);
    msg.onend = function(){
        return true;
    }
}

// Cookies
function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}