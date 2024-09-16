

const Skills = () => {

    return (
        <section id="skills">
            <h3 className="text-2xl font-bold mb-4">Skills</h3>
            <div className="flex flex-wrap">
                <div className="w-1/2">
                    <h4 className="text-lg font-bold mb-2">Languages</h4>
                    <ul className="list-disc list-inside">
                        <li>JavaScript</li>
                        <li>Python</li>
                        <li>Java</li>
                        <li>HTML</li>
                        <li>CSS</li>
                    </ul>
                </div>
                <div className="w-1/2">
                    <h4 className="text-lg font-bold mb-2">Frameworks</h4>
                    <ul className="list-disc list-inside">
                        <li>React</li>
                        <li>Node.js</li>
                        <li>Express</li>
                    </ul>
                </div>
                <div className="w-1/2">
                    <h4 className="text-lg font-bold mb-2">Databases</h4>
                    <ul className="list-disc list-inside">
                        <li>MySQL</li>
                        <li>MongoDB</li>
                        <li>PostgreSQL</li>
                        <li>SQLite</li>
                    </ul>
                </div>
                <div className="w-1/2">
                    <h4 className="text-lg font-bold mb-2">Tools</h4>
                    <ul className="list-disc list-inside">
                        <li>Git</li>
                        <li>GitHub</li>
                        <li>Heroku</li>
                        <li>Netlify</li>
                        <li>Postman</li>
                    </ul>
                </div>
            </div>
        </section>
    )
};

export default Skills;