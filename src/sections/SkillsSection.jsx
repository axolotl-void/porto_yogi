import { motion } from "framer-motion";
import { useState } from "react";
import HackerText from "../components/HackerText";
import "../styles/skills-arsenal.css";

const skillCategories = [

{
id:"languages",
title:"CORE_LANGUAGES",
desc:"Bahasa utama untuk logika program, pemrosesan data, dan pengembangan sistem.",

skills:[

{
name:"Python",
url:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
level:"90%",
desc:"Bahasa serbaguna untuk AI, automation, backend, dan IoT.",
use:["Machine Learning","Automation","Data Processing","IoT control"]
},

{
name:"JavaScript",
url:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
level:"85%",
desc:"Bahasa utama pengembangan web modern.",
use:["Frontend logic","SPA","Interactive UI"]
},

{
name:"PHP",
url:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
level:"80%",
desc:"Bahasa backend populer untuk web server.",
use:["Laravel","REST API","Web backend"]
},

{
name:"SQL",
url:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
level:"85%",
desc:"Bahasa query database relasional.",
use:["Database design","Data query","Reporting"]
},

{
name:"C++",
url:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
level:"70%",
desc:"Bahasa performa tinggi untuk sistem embedded.",
use:["IoT device","Hardware control"]
},

{
name:"Java",
url:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
level:"65%",
desc:"Bahasa OOP populer.",
use:["Android","Backend"]
}

]

},

{
id:"web",
title:"WEB_STACK",
desc:"Teknologi modern untuk membangun aplikasi web responsif & scalable.",

skills:[

{
name:"React",
url:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
level:"85%",
desc:"Library UI modern berbasis component.",
use:["SPA","Dashboard","Interactive UI"]
},

{
name:"Laravel",
url:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
level:"80%",
desc:"Framework PHP elegan untuk backend.",
use:["API","Web app"]
},

{
name:"Node.js",
url:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
level:"75%",
desc:"Runtime JavaScript server-side.",
use:["Realtime app","REST API"]
},

{
name:"Tailwind",
url:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
level:"90%",
desc:"Utility CSS framework modern.",
use:["Responsive design"]
},

{
name:"Vite",
url:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
level:"80%",
desc:"Build tool super cepat.",
use:["React dev","Hot reload"]
},

{
name:"Three.js",
url:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
level:"65%",
desc:"Library 3D untuk web.",
use:["3D UI","WebGL"]
}

]

},

{
id:"iot",
title:"HARDWARE_&_IOT",
desc:"Integrasi perangkat fisik dengan software cerdas.",

skills:[

{
name:"Arduino",
url:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
level:"90%",
desc:"Microcontroller populer untuk prototyping.",
use:["Sensor","Automation"]
},

{
name:"ESP32",
url:"https://cdn-icons-png.flaticon.com/512/5969/5969017.png",
level:"85%",
desc:"Microcontroller WiFi untuk IoT.",
use:["IoT device","Smart home"]
},

{
name:"Raspberry Pi",
url:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg",
level:"80%",
desc:"Mini computer untuk server kecil.",
use:["Edge computing"]
},

{
name:"MQTT",
url:"https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
level:"75%",
desc:"Protocol komunikasi IoT ringan.",
use:["Device messaging"]
},

{
name:"Sensors",
url:"https://cdn-icons-png.flaticon.com/512/2862/2862724.png",
level:"85%",
desc:"Berbagai sensor elektronik.",
use:["Temperature","Motion"]
},

{
name:"Cisco",
url:"https://www.vectorlogo.zone/logos/cisco/cisco-icon.svg",
level:"65%",
desc:"Networking system.",
use:["Routing","Switching"]
}

]

},

{
id:"tools",
title:"TOOLS_&_DEVOPS",
desc:"Tools pendukung workflow development.",

skills:[

{
name:"Git",
url:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
level:"85%",
desc:"Version control system.",
use:["Collaboration"]
},

{
name:"Linux",
url:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
level:"75%",
desc:"Operating system developer.",
use:["Server"]
},

{
name:"VS Code",
url:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
level:"95%",
desc:"Code editor modern.",
use:["Coding"]
},

{
name:"Figma",
url:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
level:"70%",
desc:"Design UI tool.",
use:["Wireframe"]
},

{
name:"Docker",
url:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
level:"65%",
desc:"Container virtualization.",
use:["Deployment"]
},

{
name:"Postman",
url:"https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
level:"80%",
desc:"Testing API.",
use:["API debug"]
}

]

}

];

const containerVariants={
hidden:{opacity:0},
visible:{opacity:1,transition:{staggerChildren:.08}}
};

const cardVariants={
hidden:{opacity:0,y:40},
visible:{opacity:1,y:0}
};

export default function SkillsSection(){

const [activeSkill,setActiveSkill]=useState(null)

return(

<section id="skills" className="skills-section">

<div className="skills-container">

<div className="skills-header">

<h2 className="section-title">
<HackerText text="MY_ARSENAL"/>
</h2>

<p className="skills-subtitle">
SYSTEM INVENTORY
</p>

<div className="gold-line-long"/>

</div>

<motion.div
className="skills-grid"
variants={containerVariants}
initial="hidden"
whileInView="visible"

>

{skillCategories.map((cat,i)=>(

<motion.div
key={cat.id}
className="skill-card-module"
variants={cardVariants}

>

<div className="module-header">

<span className="module-id">
0{i+1}
</span>

<h3 className="module-title">
{cat.title}
</h3>

</div>

<div className="module-divider"/>

<p className="module-desc">
{cat.desc}
</p>

<div className="tech-slots">

{cat.skills.map(skill=>(

<div
key={skill.name}
className={`tech-slot ${activeSkill?.name===skill.name?"active":""}`}
onClick={()=>setActiveSkill(skill)}
>

<div className="icon-wrapper">

<img src={skill.url} className="tech-icon-base"/>

<img src={skill.url} className="tech-icon-scan"/>

</div>

<span className="skill-name-overlay">
{skill.name}
</span>

<div className="mini-level-bar">

<div
className="level-fill"
style={{width:skill.level}}
/>

</div>

<div className="slot-corner"/>

</div>

))}

</div>

{activeSkill && (

<div className="skill-info-panel">

<h4>{activeSkill.name}</h4>

<p>{activeSkill.desc}</p>

<div className="skill-tags">

{activeSkill.use.map(tag=>( <span key={tag}>{tag}</span>
))}

</div>

</div>

)}

<div className="corner-bracket top-right"/>
<div className="corner-bracket bottom-left"/>

</motion.div>

))}

</motion.div>

</div>

</section>

)

}
