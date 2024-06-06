import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="wrapper p-5 text-center">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Link href='/'>
              <Image 
                src="/assets/images/up.jpg"
                alt="logo"
                width={138}
                height={38}
              />
            </Link>
          </div>
          <div>
            <p>Contact Information: geeta@gmail.com | +123456789 | 123 Borivali, Mumbai, Country</p>
          </div>
          <div>
            <p>Privacy Policies: <Link href="/privacy">Privacy Policy</Link></p>
          </div>
          <div>
            <p>Social Media Links: 
              <a href="https://www.facebook.com"><Image src="/assets/images/fb.jpeg" alt="Facebook" width={24} height={24} /></a>
              <a href="https://www.twitter.com"><Image src="/assets/images/th.jpeg" alt="Twitter" width={24} height={24} /></a>
              <a href="https://www.instagram.com"><Image src="/assets/images/tt.jpeg" alt="Instagram" width={24} height={24} /></a>
            </p>
          </div>
          <div className="col-span-4 text-center">
            <p>Copyright Notice: &copy; 2023 Campus LinkUp. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
