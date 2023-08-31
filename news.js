/* const handleCategory = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => console.log(data))
        .then(err => console.log(err))
} */

const handleCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories')
    const data = await res.json();

    const tabContainer = document.getElementById('tab-container');

    data.data.news_category.slice(0, 3).forEach((category) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleLoadNews('${category.category_id}')" class="tab">${category.category_name}</a>
        `
        tabContainer.appendChild(div);
    });

    // console.log(data.news_category);
};

const handleLoadNews = async (categoryId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await res.json();
    // console.log(data);

    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''; //To get refresh data

    data.data.forEach((news) => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl">
            <figure>
                <img src="${news?.image_url}" alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">
                    ${news?.title}
                    <div class="badge badge-secondary p-5">${news?.rating?.badge}</div>
                </h2>
                <p>
                    ${news?.details.slice(0, 150)}
                </p>
                <h3>Total Views: ${news?.total_view || 'No View'}</h3>
                <div class="card-footer flex justify-between mt-8">
                    <div class="flex">
                        <div>
                            <div class="avatar online">
                                <div class="w-14 rounded-full">
                                    <img
                                        src="${news?.author?.img}" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h6>${news?.author?.name}</h6>
                            <small>${news?.author?.published_date}</small>
                        </div>
                    </div>
                    <div class="card-detaild-btn">
                        <button onclick="handleModal()"
                            class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
                            Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
        `;
        cardContainer.appendChild(div);

    })

};

const handleModal = (data) => {
    const modalContainer = document.getElementById('modal-container');
    const div = document.createElement('div');
    div.innerHTML = `
        <dialog id="news_modal" class="modal">
            <form method="dialog" class="modal-box">
                <h3 class="font-bold text-lg">Hello!</h3>
                <p class="py-4">Press ESC key or click the button below to close</p>
                <div class="modal-action">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn">Close</button>
                </div>
            </form>
        </dialog>
    `;
    modalContainer.appendChild(div);

    const modal = document.getElementById('news_modal');
    modal.showModal();
}


handleCategory();
handleLoadNews('01');