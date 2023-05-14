import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

function About() {
  return (
    <>
      <h1>About Page</h1>
      <div className="d-flex justify-content-between">
        <div className="text-center">
          <img src="https://avatars.githubusercontent.com/u/102775877?v=4" width="70%" alt="James Lee" className="m-3" />
          <div>
            <h4>James Lee</h4>
            <p>Full Stack Web Developer</p>
            <a target="_blank" rel="noopener" href="https://github.com/aardvarkpepper">
              <AiFillGithub style={{ fontSize: '50px'}} />
            </a>
            <a target="_blank" rel="noopener" href="https://www.linkedin.com/in/james-lee-software-development/">
              <AiFillLinkedin style={{ fontSize: '50px'}} />
            </a>
          </div>
        </div>
        <div className="text-center">
          <img src="https://avatars.githubusercontent.com/u/115429022?v=4" width="70%" alt="Jinseok Jung" className="m-3" />
          <div>
            <h4>Jinseok Jung</h4>
            <p>Full Stack Web Developer</p>
            <a target="_blank" rel="noopener" href="https://github.com/pjungjs">
              <AiFillGithub style={{ fontSize: '50px'}} />
            </a>
            <a target="_blank" rel="noopener" href="https://www.linkedin.com/in/jinseok-jung/">
              <AiFillLinkedin style={{ fontSize: '50px'}} />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default About;