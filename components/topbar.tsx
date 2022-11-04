import Link from 'next/link'

export default function TopBar (){

const pages_links = ["/authpage", "/offers", "/events"];
    const pages_name = ['Login / Sign Up', 'Offers', 'Events'];
    const nb_of_pages = 3

    function render_pages() {
        let pages = [];
        for (let i = 0; i < nb_of_pages; i++) {
            pages.push(
                <div key={i}>
                <Link href={pages_links[i]}>
                    {pages_name[i]}
                </Link>
                </div>
            );
    }
    return pages;
  }

    return (
        <div>
            <Link href="/">Gleanathon</Link>
            {render_pages()}
        </div>
    )
}