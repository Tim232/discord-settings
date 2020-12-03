const notification = document.getElementById('notification')
const messageBadge = document.getElementById('message-badge')
const darkBtn = document.getElementById('dark-btn')
const lightBtn = document.getElementById('light-btn')

const discordIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADxElEQVRYR+1XS0wTaxT+ZoaWabVUQN6Uh4XY+ojv5C50YUJu7uIaY4wujGI06EqjIo2Jj5WPGAsYjRu8JsbHSu8z92rie2GMMVEjC2kJVKBY5FlTCp0+mBnzj3bo0NIO2qsuPJu285//nO//zjnfP6XwyTbdEJkyt/MIROwDkBN9nuZPLyicc5dZTt7cTPEkNhVNcLDReRSieDzNCROHo6hjTQ2WE0oAdscwgNyvAgAYabJZ504FIH6l5FKaJptVYn+yBHbHDwDTMlCcl4kVC42YY9DAMxhEq3MUOpZBppaW6AyGBYQjAtYsz0ZxHouedxxevPahbyg0bVVVlcCgz8CGmgIU5GrRPxyWEpYXsVLyROYfn0CXhwObSaMkn0WnO4C/HwzAH5iIc1cFYOuvxVhcbZA2M4zcLqp6NRIRoNHQeOUcxfX/+mYOwGjIwJHdVaBnljcukSACJy92wudXspCSgV9W56Hmp/TIwr2nw7jzhMjMpKUEcHiXGTlGjSq6Uzl5fRGc+s2lHgDp+vrtlXFxQ2EBbweCKC1g5QmIOo0FeAx6Qygr0iEjQb80X+lSTEVSBtasyMH6tfkKAFyQR/PVbrwfjSA7S4P62gp5Gobeh3H+eg+4EA9TIYs9W8rBTGmefx4N4vELrxwzKQDS/UstWQoAre1+XPvXIz/btq4ES+Z/nJCHz0Zw+/GQvLZ/W4XEUqxNnYakAAj9pAyxRk7ZeLkLvCBKp2vYUYm8bK3k0uEeR8uNXum7XsfgcJ1Z0oJYI6JEyhC1pACO76lOKDY9fRzaXGNYYJ6N8mKdIoHjzRjI+jJrFgpyleCJIynhsQsd6gDYGyzyLUX0meN46WQzMdIPWg0t9wKJY2t0qgNg21GpOAWhj5ywvEiHeSZ9UnFyv+Pg6g2gslSPihiWBkZCsF9WWQLDrAyQRjSb9DJiomgv23z46/4ASgtZ5OdooWcZ0DSFcY6H1xdGb38QRMBWLTIqRpEAInJM7gpVPUCciAJbzbOxcqFROgkpwaU/eqULJplVlelRt9GEQJBHt4fD89c+OFxjmHrVplTCmdT7c3x/APguGSDdpVSXzynu5J5+AMbpYsYx0GB3XBGB2i/LqdjtF2lhAyXQfwJQXiyJXssPnXYZJ5jw7wBq0gWCAtYKtOCjBPouAOmPyLQ6EF042NhuoUShMB0geIbuOFs/32M701YtUPQDQDSlBJCOxIliHGhuL6F54RaAJWQ9rgf+r8Sxcfee78jShCZuUsDP3wQAAbO75bnGMDqrpclm3Ul+fwCF65kwy+AsFwAAAABJRU5ErkJggg=='

const changeTheme = () => {
    const dark = localStorage.getItem('dark') ? JSON.parse(localStorage.getItem('dark')) : true

    darkBtn.checked = dark
    darkBtn.disabled = dark
    lightBtn.checked = !dark
    lightBtn.disabled = !dark
    
    document.body.className = dark ? 'dark' : 'light'
}

changeTheme()

const notificationCheck = localStorage.getItem('notification') ? JSON.parse(localStorage.getItem('notification')) : false

if (Notification.permission === "granted" && notificationCheck) notification.checked = true

notification.addEventListener('change', ({ target: { checked } }) => {
    if (checked) {
        if (Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    notification.checked = true
                    localStorage.setItem('notification', true)
                } else {
                    notification.checked = false
                    localStorage.setItem('notification', false)
                }
            }).catch(() => {
                notification.checked = false
                localStorage.setItem('notification', false)
            })
        } else {
            notification.checked = false
            localStorage.setItem('notification', false)
        }
    } else localStorage.setItem('notification', false)
})

messageBadge.addEventListener('change', ({ target: { checked } }) => {
    const icon = document.querySelector('link[rel=icon]')

    checked
        ? icon.href = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEP0lEQVRYR+2Xa0ybZRTHf29LoYUVxm3cGdDhiou4yKLGOYLZhovD6MxmRphbNiNDYqLZIJJN/DLmNFwiGWbgNRM/eM284AwTEzEx6lR0WwZF6SgIOBhCoNhCS/uat66F2kLbQfbJ50uTnvOc/6/nnOc8TwWur13vi/LUft1RRJ4GopzfL/PnGAL1/ana4x88Ktik2IJT4HCN7jlE8dgyC3oPJwiVtWXaKneA6q5RIPqmAMBfteVZMf8FEG+SuEOmtjzLkf25ElR3/Q+wYAYSY0PIWRfBSrWCwZFpLugmUSnlhATLHOmcttixWO1suiOSxFglfX+a+fnyBEPXZhasql8lUIcGsWNLHHHRwVwdtTgEVycoHeLelvHvWXoHzShDZCStUtLTb+Ljr4YxmmY93P0C2FOQyG2ZasdmudzVLn71qtVqR6GQ8atukndahgIHiFAHcbR4DbLAdD2E7CIcf7WHCaN7FnxmYNu9sWy5e3nGwpffjdL6rTRm5pZPgCNPaIiKUPiVbl9OYxNWXnhN7z+A1PWH9qV7xJ2x2BkYniY5Tuk6AU6nKZONkbEZUlaC2G9ANJuRhYejyMx0uNSd7nU7FYtmYFNOFA/dt8oNwDxto+5tA+OTViLDFRzam+Y6DdfGLZwrOUHa+U9JMHS47ROCg1Hl56Pb8DAtYRtdtkUBpO5frw13C3Sh20jzZ4Ou7x57MInb16qZbm/H8HgpwfpOX5WgX5tL+47nMUYlLT6KpfRLZZi/pF9Z81YvNruIXCZQtj8d1bkzjOze7VN4voNJHcPnBxqpqN+58F1w7KlMr8Omb8hMp36KWzUriPv9PEN5eQGJO50liDDjaHwGDHu9jKrLtK5bSprPZrONUJX79BvIzsZy6dINAVzf9K4GCr0ClO9PJy56rgTSTO+6MsXqBBUZKaFMNZ5itLR0KeL/TlfY6BVAHRaE1IialFCXiDTROjonONM2zCOn9hDZ/eOSAURoWPA9IBmyNCvYsC6CtESVowSvf/QHBv04xUfWL1lcCiDAxYAfJJHDegprCrwCBCUnE9PYiGrrVofd3NrKSFERdqNxQeCAAWIHLrOrfqfXgDENDYSXlEhXp8MuWq1M1NUxVlGxfAARo30UvbTNa8CEtjZUmze72Uxnz3J1+/blA5AiHazIRm6zegQNNAMifD+/BCZA5U93PfDmk6R1fe3hGmgPCFDlAiir7jotwl5/ADQXW7m/+Rl/XH35rHUBPPuiPmJWbvkQ2OJrl2QveOMgqbpv/HH16iNATQaUezy4Dtd0awXRHu8r8i2/fBKf917lK3KbNeD/kYNr7iK35wf3y8iXoDd7D+QI0AL4BHbul8S/2HeSE5V3Lh1ACnoF4kR4GfB5L8+GqE42VXVIdc/3eJDcSAbm7zHAPbNQKINcEbKdNumoyaBNhGYN/Fbc9JNCPRnWVFuedUDy+Qf14qYD2osC1wAAAABJRU5ErkJggg=='
        : icon.href = discordIcon
})

darkBtn.addEventListener('change', ({ target: { checked } }) => {
    if (checked) {
        lightBtn.checked = false
        lightBtn.disabled = false

        darkBtn.disabled = true

        localStorage.setItem('dark', true)
        changeTheme(true)
    }
})

lightBtn.addEventListener('change', ({ target: { checked } }) => {
    if (checked) {
        darkBtn.checked = false
        darkBtn.disabled = false

        lightBtn.disabled = true

        localStorage.setItem('dark', false)
        changeTheme(false)
    }
})

document.body.addEventListener('contextmenu', event => event.preventDefault())

if (window.devtools.isOpen) {
    console.log('%c잠깐만요!', 'font-size: 70px; font-weight: 600; color: #7289DA; -webkit-text-stroke-color: black; -webkit-text-stroke-width: 2px;')
    console.log('%c누가 속이려고 복사/붙여넣기하라고 하는 것 같은데...조심하세요.', 'font-size: 1.025rem;')
    console.log('%c아무거나 여기에 붙여넣기하면 원하지 않는 외부 사람에게 Discord 계정 액세스 권한을 넘겨 주게 될 수도 있어요!', 'color: red; font-size: calc(1.45em + .65px); font-weight: 600;')
    console.log('%c지금 뭘 하는 건지 확실히 아는 게 아니라면, 그냥 안전하게 가만히 있으세요...', 'font-size: 1.368em;')
    console.log('%c지금 뭘 하는 건지 확실히 아는 거라면, 우리 회사에 당장 입사하는 건 어때요? https://discord.com/jobs', 'font-size: 1.368em;')
}

window.addEventListener('devtoolschange', ({ detail: { isOpen } }) => {
    if (isOpen) {
        console.log('%c잠깐만요!', 'font-size: 70px; font-weight: 600; color: #7289DA; -webkit-text-stroke-color: black; -webkit-text-stroke-width: 2px;')
        console.log('%c누가 속이려고 복사/붙여넣기하라고 하는 것 같은데...조심하세요.', 'font-size: 1.025rem;')
        console.log('%c아무거나 여기에 붙여넣기하면 원하지 않는 외부 사람에게 Discord 계정 액세스 권한을 넘겨 주게 될 수도 있어요!', 'color: red; font-size: calc(1.45em + .65px); font-weight: 600;')
        console.log('%c지금 뭘 하는 건지 확실히 아는 게 아니라면, 그냥 안전하게 가만히 있으세요...', 'font-size: 1.368em;')
        console.log('%c지금 뭘 하는 건지 확실히 아는 거라면, 우리 회사에 당장 입사하는 건 어때요? https://discord.com/jobs', 'font-size: 1.368em;')
    }
})
