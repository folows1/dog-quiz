import LogoGit from "../assets/icons8-github.svg";
import LogoLinkedin from "../assets/icons8-linkedin-circundado.svg";
import LogoTwitter from "../assets/icons8-twitter.svg";

function Footer() {
  return (
    <footer className="text-center bg-yellow-900 w-full p-3">
      <p className="font-bold text-xs mb-3">
        Esse jogo utiliza a API pública do{" "}
        <a
          href="https://dog.ceo/dog-api/"
          target="_blank"
          rel="noreferrer"
          className="text-white underline"
        >
          Dog API
        </a>
        .
      </p>
      <div className="flex flex-col items-center justify-center md:flex-row md:justify-evenly">
        <a
          href="https://twitter.com/folows1"
          target="_blank"
          rel="noreferrer"
          className="text-white"
        >
          <img
            src={LogoTwitter}
            alt="Linkedin"
            className="w-[40px] h-[40px] inline-block"
          />
          <p className="text-white text-sm ml-2 inline-block">/folows1</p>
        </a>

        <a
          href="https://github.com/folows1/dog-quiz"
          target="_blank"
          rel="noreferrer"
          className="text-white"
        >
          <img
            src={LogoGit}
            alt="Github"
            className="w-[40px] h-[40px] inline-block"
          />
          <p className="text-white text-sm ml-2 inline-block">/folows1</p>
        </a>

        <a
          href="https://www.linkedin.com/in/michelribeiro1/?original_referer="
          target="_blank"
          rel="noreferrer"
          className="text-white"
        >
          <img
            src={LogoLinkedin}
            alt="Linkedin"
            className="w-[40px] h-[40px] inline-block"
          />
          <p className="text-white text-sm ml-2 inline-block">Michel Ribeiro</p>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
