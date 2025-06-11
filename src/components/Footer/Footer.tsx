import './Footer.scss';

const Footer = () => {
  return (
     <footer className="main-footer">
      <div className="copyright">&copy; {new Date().getFullYear()} - My Recipes by <a href="https://github.com/Mil00Z/my-recipes"><span> Mil00Z </span></a></div>
    </footer>
  );
};

export default Footer;