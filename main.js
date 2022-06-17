import './css/style.css'
import {moveCamera, animate} from './three'

document.body.onscroll = moveCamera
animate()

// Fetching Blog Data
getData()
async function getData() {
    const res = await fetch('https://dev.to/api/articles?username=thedevguy')
    const data = await res.json()
    
    data.forEach((data) => {
        
        const blogs = document.querySelector('.blogs .grid')
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
                <div class="time">${data.reading_time_minutes} Min. Read</div>
                <h3>${data.title}</h3>
            <a href="${data.url}" target="_blank_"> Go to Blog </a>
           
            

        `
        blogs.appendChild(blog)
        
        
    })
}

// Nav and Mobi-Nav

// nav and links
const links = document.querySelectorAll('.nav a')
const mobileLinks = document.querySelectorAll('.mobi-nav a')
const nav = document.querySelector('.nav')
const mobiNav = document.querySelector('.mobi-nav')
const navHeight = nav.getBoundingClientRect().height

const toggle = document.querySelector('#btn')
const toggleIcon = document.querySelector('.menu')
const topBtn = document.getElementById('top-btn')

// pointer on active Link
links.forEach(link => {
    link.addEventListener('click', () => {
       nav.querySelector('.active').classList.remove('active')
       link.classList.add('active')
    })
})

// toggling the mobile navigation
toggle.onclick = () => {
    mobiNav.classList.toggle('active')
    if (mobiNav.classList.contains('active')) {

        toggleIcon.classList.add('open')
    } else {
        toggleIcon.classList.remove('open')
    }
}

mobileLinks.forEach( (link) => {
    link.addEventListener('click', () => {
    mobiNav.classList.remove('active')
    // toggleIcon.src = menu
    toggleIcon.classList.remove('open')
    })
})


// Back To Top Button
topBtn.onclick = () => {
    window.scrollTo(0,0)
}

// Sticky Navigation on Scrolling
window.addEventListener('scroll', () => {
    nav.classList.toggle('sticky', window.scrollY > 50)
})

// custom smooth scroll to navigate to the exact position of an element

function scrollToElement(element) {
 
    element.addEventListener('click',(e) => {
        e.preventDefault()
        const id = e.currentTarget.getAttribute("href").slice(1)

        const targetElement = document.getElementById(id)

            // calculate the heights
            let position = targetElement.offsetTop - (navHeight + 40) 
            window.scrollTo( 0,position)
    })
}

    links.forEach(link => scrollToElement(link))

    mobileLinks.forEach(link => scrollToElement(link))