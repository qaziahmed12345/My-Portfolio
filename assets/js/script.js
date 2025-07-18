$(document).ready(function () {
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // Scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // Smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear');
    });

    // EmailJS to mail contact form data
    $("#contact-form").submit(function (event) {
        event.preventDefault(); // Prevent default form submission
        emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
    });

    // Visibility change event
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Qazi Ahmed Ali";
            $("#favicon").attr("href", "assets/images/favicon.png");
        } else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });

    // Typed.js effect
    var typed = new Typed(".typing-text", {
        strings: ["CyberSecurity","Prompt Engineer",  "web development"],
        loop: true,
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 500,
    });

    // Fetch data function
    async function fetchData(type = "skills") {
        let response;
        try {
            response = await fetch(type === "skills" ? "skills.json" : "projects/projects.json");
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Show skills function
    function showSkills(skills) {
        let skillsContainer = document.getElementById("skillsContainer");
        let skillHTML = "";
        skills.forEach(skill => {
            skillHTML += `
            <div class="bar">
                <div class="info">
                    <img src="${skill.icon}" alt="skill" />
                    <span>${skill.name}</span>
                </div>
            </div>`;
        });
        skillsContainer.innerHTML = skillHTML;
    }

   

    // Add event listeners for each skill bar
    const skillBars = document.querySelectorAll('.bar');
    skillBars.forEach(bar => {
        bar.addEventListener('mouseenter', createLogoRain);
        bar.addEventListener('mouseleave', () => {
            effectContainer.innerHTML = ''; // Clear logos when mouse leaves
        });
    });

    // Show projects function
    function showProjects(projects) {
        let projectsContainer = document.querySelector("#work .box-container");
        let projectHTML = "";
        projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
            projectHTML += `
            <div class="box tilt">
                <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
                <div class="content">
                    <div class="tag">
                        <h3>${project.name}</h3>
                    </div>
                    <div class="desc">
                        <p>${project.desc}</p>
                        <div class="btns">
                            <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
                        </div>
                    </div>
                </div>
            </div>`;
        });
        projectsContainer.innerHTML = projectHTML;

        // Tilt effect
        VanillaTilt.init(document.querySelectorAll(".tilt"), {
            max: 15,
        });

        // Scroll reveal animation
        const srtop = ScrollReveal({
            origin: 'top',
            distance: '80px',
            duration: 1000,
            reset: true
        });

        srtop.reveal('.work .box', { interval: 200 });
    }

    // Fetch and display skills and projects
    fetchData().then(data => {
        showSkills(data);
    });

    fetchData("projects").then(data => {
        showProjects(data);
    });

    // Disable developer mode
    document.onkeydown = function (e) {
        if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'C'.charCodeAt(0) || e.keyCode == 'J'.charCodeAt(0))) || (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) {
            return false;
        }
    };

    // Start of Tawk.to Live Chat
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
        var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
    })();
});
