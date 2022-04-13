import './css/style.css'
import spaceImg from './Images/space.jpg'
// import html from '/Images/html5.png'
// import css from '/Images/css.png'
// import js from '/Images/js.png'
// import react from '/Images/react.png'
// import node from '/Images/nodejs.png'
// import github from '/Images/Octocat.png'
import * as THREE from 'three'

const scene = new THREE.Scene(); // the container where everything happens

const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1/1000); // 3d camera which takes (view,aspect ratio,scope of objects that are visible to the camera) as arguments

const renderer = new THREE.WebGL1Renderer({
  
  canvas: document.querySelector('#bg')
}
);

// Resetting the camera view and renderer size for any change in the screen size.
window.addEventListener('resize',() => {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix()
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);
camera.position.setZ(25); // moving the camera close to the user

renderer.render(scene,camera)

// const geometry = new THREE.polygonGeometry(10,3,16,100)
const geometry = new THREE.DodecahedronGeometry(14)

// You can create your own material by WebGl library.
// basic material requires no light source while light bounces of a StandardMaterial to give it good lighting effect

const material = new THREE.MeshStandardMaterial( { color: 'rgb(132, 188, 240)', wireframe:true} )

const polygon = new THREE.Mesh( geometry, material)
polygon.position.set(10,-10,-10)

scene.add(polygon)


// for lighting everything in a scene
const ambientLight = new THREE.AmbientLight(0xffffff)
 scene.add(ambientLight)


const spaceTexture = new THREE.TextureLoader().load(spaceImg)
scene.background = spaceTexture

// const cubeLoader = new THREE.CubeTextureLoader()
// .load( [
//   html,css,js,react,node,github
// ] );

// const cubematerial = new THREE.MeshBasicMaterial({map : cubeLoader })
// const picture = new THREE.Mesh( new THREE.BoxGeometry(10,10,10), cubematerial)

// scene.add(picture)

function moveCamera() {
  
  const t = document.body.getBoundingClientRect().top



   // rotating the cube on scroll
   /* picture.rotation.x += 0.05
   picture.rotation.y += 0.05
   picture.rotation.z += 0.01 */
 
   camera.position.z = t * -0.01
   camera.position.x = t * -0.0002
   camera.position.y = t * -0.0002

}

document.body.onscroll = moveCamera


// making a recursive function so that we do not need to call the renderer.render() method again and again for your shapes/objects to show.

function animate() {

  // animating by changing the rotation of our polygon shape infintely in a recursive func.
  polygon.rotation.x += 0.01;
  polygon.rotation.y += 0.005;
  polygon.rotation.z += 0.01;

  // controls.update()

  requestAnimationFrame(animate)
  renderer.render(scene,camera)
}

animate()


// Fetching Blog Data
getData()
async function getData() {
    const res = await fetch('https://dev.to/api/articles?username=thedevguy')
    const data = await res.json()
    
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
            <div class="time">${data.reading_time_minutes} Min. Read</div>

            <p>${data.description}
            <a href="${data.url}" target="_blank_"> Keep Reading </a>
            </p>
            

        `
        blogs.appendChild(blog)
        
        
    })
}

// Nav and Mobi-Nav

import menu from '/Images/menu.svg'
import cancel from '/Images/cancel.svg'

// nav and links
const links = document.querySelectorAll('.nav a')
const mobileLinks = document.querySelectorAll('.mobi-nav a')
const nav = document.querySelector('.nav')
const mobiNav = document.querySelector('.mobi-nav')
const navHeight = nav.getBoundingClientRect().height

const toggle = document.querySelector('#btn')
const toggleIcon = document.querySelector('#btn img')
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

        toggleIcon.src = cancel
    } else {
        toggleIcon.src = menu
    }
}

mobileLinks.forEach( (link) => {
    link.addEventListener('click', () => {
    mobiNav.classList.remove('active')
    toggleIcon.src = menu
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

    links.forEach(function (link) {
        link.addEventListener('click', (e) => {
            e.preventDefault()
            const id = e.currentTarget.getAttribute("href").slice(1)
            const element = document.getElementById(id)

            // calculate the heights
            let position = element.offsetTop - (navHeight + 40) 
            window.scrollTo( 0,position)   

        })

    })
    mobileLinks.forEach(function (link) {
        link.addEventListener('click', (e) => {
            e.preventDefault()
            const id = e.currentTarget.getAttribute("href").slice(1)
            const element = document.getElementById(id)

            // calculate the heights
            let position = element.offsetTop - navHeight
            window.scrollTo( 0,position)   

        })

    })