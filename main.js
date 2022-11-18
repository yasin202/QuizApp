const categoryBtns = document.querySelectorAll('button')

categoryBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        if (e.target.textContent === 'اطلاعات عمومی') {
            location.href = `html/questions.html?category=${e.target.textContent}`
        } else {
            alert ('گفتم ست نشده ....عه')
        }
    })
})