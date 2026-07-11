const Footer = () => {

  return (

    <footer className="fixed bottom-0 left-0 right-0 z-50 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">

      <div className="flex items-center justify-center px-4 py-3 text-sm text-muted-foreground">

        © {new Date().getFullYear()} WishAura

      </div>

    </footer>

  );

};

export default Footer;