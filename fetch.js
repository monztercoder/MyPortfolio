

getData()
async function getData() {
    const res = await fetch('https://dev.to/api/articles?username=thedevguy')
    const data = await res.json()

    console.log(data)

    
    data.forEach((data) => {
        
        const blogs = document.querySelector('.blogs')
        const blog = document.createElement('div')
        blog.classList.add('blog')

        blog.innerHTML = `
        <img alt="cover image" src="${data.cover_image}">
            <div class="creds flex">
                <div class="icon"><img src="${data.user.profile_image}" alt="logo"></div>
                <div class="block">
                    <div class="name">Aditya Khare</div>
                    <div class="date-container">
                        <span class="date">${data.readable_publish_date}</span> 2022
                    </div>
                </div>
            </div>
            <h2>${data.title}</h2>
            <p>${data.description}</p>
            <div class="creds-btm">
                <div><span class="time">${data.reading_time_minutes}</span> Min. Read</div>
                <div class="link">Read the full Article on <a href="${data.url}" target="_blank_"> My Blog </a></div>
            </div>

        `
        blogs.appendChild(blog)
        
        
    })
}

const btn = document.querySelector('#btn');
        const sideBar = document.querySelector('.sidebar');
        const logoutBtn = document.querySelector('#logout');

        btn.onclick = () => {
            sideBar.classList.toggle('active');
        }

        logoutBtn.onclick = () => {
            sideBar.classList.toggle('active');
        }