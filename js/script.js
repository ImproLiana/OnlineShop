const tg = window.Telegram.WebApp;
const items = [
    {
        name: 'Avgvst x Crosby Studios Cutlery тринкет',
        price: 5800,
        image: 'img/im1.jpg',
        count: 0
    },
    {
        name: 'Karpinsky for Avgvst серьги земляника',
        price: 9000,
        image: 'img/im2.jpg',
        count: 0
    },
    {
        name: 'Karpinsky for Avgvst тринкет бабочка',
        price: 5500,
        image: 'img/im3.jpg',
        count: 0
    },
    {
        name: 'Karpinsky for Avgvst пуссета цветок земляники',
        price: 4500,
        image: 'img/im4.jpg',
        count: 0
    },
    {
        name: 'Liars for Avgvst тринкет скрепка',
        price: 8000,
        image: 'img/im5.jpg',
        count: 0
    },
    {
        name: 'Karpinsky for Avgvst пластилиновое кольцо',
        price: 24800,
        image: 'img/im6.jpg',
        count: 0
    },
    {
        name: 'Karpinsky for Avgvst пуссета месяц',
        price: 4500,
        image: 'img/im7.jpg',
        count: 0
    },
    {
        name: 'Кольцо кувшинка',
        price: 5000,
        image: 'img/im8.jpg',
        count: 0
    },
    {
        name: 'Подвеска фиалка',
        price: 9500,
        image: 'img/im9.jpg',
        count: 0
    },
    {
        name: 'Серьги-шнуры с ромашкой',
        price: 16800,
        image: 'img/im10.jpg',
        count: 0
    },
    {
        name: 'Avgvst x Crosby Studios Cutlery моносерьга',
        price: 7000,
        image: 'img/im11.jpg',
        count: 0
    },
    {
        name: 'Хуп-пружинка',
        price: 3800,
        image: 'img/im12.jpg',
        count: 0
    },
];

const grid = document.querySelector('.grid');


items.forEach(item => {
    const div = document.createElement('div'); 
    div.className = "item";
    div.innerHTML = `
        <p>${item.name}</p>
        <p>${item.price}₽</p>
        <button >Добавить</button>
        <button class="button-minus hide">-</button>
        <span class='text_bag hide'>0</span>
        <button class="button-plus hide">+</button>
        <img src="${item.image}">
    `;
    grid.appendChild(div);

    const button_change = div.querySelector('button');
    const button_plus = div.querySelector('.button-plus');
    const button_minus = div.querySelector('.button-minus');
    const text_bag = div.querySelector('.text_bag');

    button_change.addEventListener('click', () => {
        button_change.classList.add('hide');
        button_plus.classList.remove('hide');
        button_minus.classList.remove('hide');
        text_bag.classList.remove('hide');
        text_bag.textContent = 1;
        item.count = 1;
    });

    button_plus.addEventListener('click', () => {
        text_bag.textContent = +text_bag.textContent + 1;
        item.count++;
    });

    button_minus.addEventListener('click', () => {
        if (+text_bag.textContent > 1) {
            text_bag.textContent = +text_bag.textContent - 1;
            item.count--;
        } else {
            button_change.classList.remove('hide');
            button_plus.classList.add('hide');
            button_minus.classList.add('hide');
            text_bag.classList.add('hide');
            // text_bag.textContent = +text_bag.textContent-1;
            text_bag.textContent = 0;
            item.count = 0;
            console.log('a');
        }
    });
});


check_button = document.querySelector('#check_button')
check_button.addEventListener('click', () => {
    const table = document.querySelector('table');
    table.remove();
    docheck();
})


const body = document.querySelector('body');

function docheck() {
    const table = document.createElement('table');
    body.appendChild(table);

    const tbody = document.createElement('tbody');
    tbody.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Total</th>
        </tr>
    `;
    table.appendChild(tbody);

    let check = [];
    items.forEach(item => {
        if (item.count > 0) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.name}</td>
                <td>${item.price}₽*${item.count}</td>
                <td>= ${item.price*item.count}</td>
            `;
            tbody.appendChild(tr);
            check.push(`${item.name}/${item.price}/${item.count}/${item.price*item.count}`)
        }
    });
    
    let total = 0;
    items.forEach(item => {total += item.price*item.count});

    const tr = document.createElement('tr'); 
    tr.innerHTML = `
        <td id="total" colspan="3"><b>Total: ${total}</b></td>
    `;
    tbody.appendChild(tr);

    check.push(total);
    const newcheck = JSON.stringify(check);
    tg.sendData(newcheck);
    console.log(check);
}
