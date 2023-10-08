import image from '../media/Library-Image.jpg';
import '../TabsStyle/Home.css'

export default function Home() {
    return (
        <div style={{ backgroundImage:`url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        }}>
            <h1 className="position-absolute top-50 start-50 translate-middle">
                <span className="title"><span className="title-1">Book Library</span> <br />
                <span className="title-2">By Filip Mossberg</span></span></h1>
        </div>
    )
}

