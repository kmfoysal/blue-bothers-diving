export default function GoogleMap({ location }) {
    return (
        <div className="">
            <iframe
                src={location || "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28340.321856838036!2d33.6646526!3d27.3900707!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145266ece789b8d3%3A0x3f6f974ed5f5c33f!2sBlue%20Brothers%20Diving!5e0!3m2!1sen!2sbd!4v1758198857795!5m2!1sen!2sbd"}
                height="536"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
                title="Google Maps"
            ></iframe>
        </div>
    );
}
