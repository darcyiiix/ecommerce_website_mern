const products = [
{
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    description:
        'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive liistening experience Built-in microphone allows you to take calls while working',

    brand: 'Apple',
    category: 'Electronics',
    price: 81.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
},

{
    name: 'Amazon Echo Dot',
    image: '/images/alexa.jpg',
    description:'OUR BEST SOUNDING ECHO DOT YET Enjoy an improved audio experience compared to any previous Echo Dot with Alexa for clearer vocals, deeper bass and vibrant sound in any room. YOUR FAVORITE MUSIC AND CONTENT Play music, audiobooks, and podcasts from Amazon Music, Apple Music, Spotify and others or via Bluetooth throughout your home.',
    brand: 'Amazon',
    category: 'Electronics',
    price: 54,
    countInStock: 18,
    rating: 5,
    numReviews: 564,
},

{
    name: 'Canon EOS 90D + EF-S 18-135mm IS USM',
    image: '/images/camera.jpg',
    description:
        'The EOS 90D comes with 10 fps continuous shooting, a 32.5 megapixel sensor and 45 point cross-type autofocusing that tracks moving objects with phenomenal speed and precision. It?s a great camera for wildlife enthusiasts and sports fans, with its APS-C size sensor that extends the effective reach of telephoto lenses. A 220,000 pixel RGB+IR metering sensor ensures accurate exposures and helps the camera recognise and follow faces and other objects. As a DSLR the EOS 90D features a bright, clear optical viewfinder that shows the world as it really is, in real time. In this kit, the camera is paired with a very versatile EF-S 18-135mm f/3.5-5.6 IS USM lens that?s suitable for everything from landscapes to portraits and sport.',

    brand: 'Canon',
    category: 'Electronics',
    price: 892.99,
    countInStock: 0,
    rating: 4.5,
    numReviews: 12,
},

{
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/mouse.jpg',
    description: 'Logitech G203 Wired Gaming Mouse',
    brand: 'Logitech',
    category: 'Peripherals',
    price: 25.99,
    countInStock: 1000,
    rating: 4.5,
    numReviews: 11,
},

{
    name: 'Apple iPhone 13 Pro Max 256GB',
    image: '/images/phone.jpg',
    description:
        'Dual Sim, Dual Standby (Nano-SIM). Super Retina XDR OLED Touchscreen, Multitouch. Scratch-resistant ceramic glass, oleophobic coating, Apple A15 Bionic (5 nm)',
    brand: 'Apple',
    category: 'Electronics',
    price: 1100.88,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
},

{
    name: 'Sony PlayStation 5',
    image: '/images/playstation.jpg',
    description:
        'Experience stunning games on the PlayStation 5 (Model Number CFI-1102A) as you marvel at incredible graphics and delve into a breathtaking immersion. The console takes gaming to new heights with support for haptic feedback, adaptive triggers, and 3D Audio technology, providing a deeper and more immersive gaming experience. With lightning speed, the custom CPU, GPU, and SSD with Integrated I/O rewrite the rules of what a PlayStation console can achieve, delivering unparalleled performance. Explore the next generation of gaming with the PS5, where incredible visuals, innovative features, and cutting-edge technology come together for an extraordinary gaming journey.',
    brand: 'Apple',
    category: 'Console',
    price: 500,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
},

{
    name: 'Macbook Air M1',
    image: '/images/mac.jpg',
    description: 'The Apple M1 chip powers this laptop, featuring an 8-core CPU with 4 performance cores and 4 efficiency cores, along with a 7-core GPU and a 16-core Neural Engine for 5x faster machine learning performance. With a battery life of up to 15 hours for wireless web usage and up to 18 hours for Apple TV app movie playback, it ensures extended productivity. Boasting 8GB of unified memory, tasks are executed swiftly, complemented by a 256 GB superfast SSD storage for instant app launches and file access. The 13.3-inch Retina display delivers a native resolution of 2560-by-1600 at 227 pixels per inch, supporting millions of colors. The device features a 720p FaceTime HD camera with an advanced image signal processor for computational video, and Next-generation Wi-Fi 6 provides faster connectivity. Security is enhanced with Touch ID for secure unlocking and payments. Audio is delivered through stereo speakers with wide stereo sound, supporting Dolby Atmos playback, and a three-mic array with directional beamforming.',
    brand: 'Apple',
    category: 'Electronics',
    price: 1100,
    countInStock: 110,
    rating: 4.8,
    numReviews: 17,
},

{
    name: 'Sony PS5 DualSense Wireless Controller',
    image: '/images/ps5-controller.jpg',
    description: 'Experience a deeper, highly immersive gaming journey with this cutting-edge device featuring a built-in microphone and headset jack for seamless communication, a built-in battery for uninterrupted gameplay, an integrated speaker for immersive audio, and a motion sensor for an interactive and responsive experience. The comfortable design ensures that players can fully engage in their gaming adventures for extended periods, enhancing both enjoyment and performance. This device is crafted to provide an all-encompassing gaming experience, combining advanced technology with user-friendly design elements.',
    brand: 'Sony',
    category: 'Gaming',
    price: 60,
    countInStock: 5,
    rating: 4.2,
    numReviews: 172,
},

{
    name: 'DJI Mini 3 Pro - MVM300P',
    image: '/images/drone.jpg',
    description: 'The drone boasts impressive capabilities, supporting up to 4K60p video and capturing 48MP raw stills. Equipped with tri-directional obstacle avoidance, it ensures a safe and smooth flight experience. Weighing in at a regulation-friendly 8.8 ounces, this drone is both portable and versatile. It requires a remote (not included) for operation and offers up to 34 minutes of flight time. The rotating gimbal facilitates vertical shooting, and slow-motion video at Full HD 1080p120 adds creative flexibility. With a remarkable 7.5-mile range powered by OcuSync 3 technology, it excels in long-distance flights. The FocusTrack subject tracking system enhances precision, and its foldable design makes it convenient for travel and storage. This drone combines cutting-edge features with a user-friendly design, making it a top choice for aerial enthusiasts.',
    brand: 'DJI',
    category: 'Electronics',
    price: 610,
    countInStock: 6,
    rating: 3,
    numReviews: 172,
},

{
    name: 'SAMSUNG S90C 65 -inch OLED 4K Smart TV QA65S90CAUXZN Black',
    image: '/images/samsung.jpg',
    description: 'OLED Neural Quantum Processor 4K LaserSlim Design Motion Xcelerator Turbo Pro',
    brand: 'Samsung',
    category: 'Electronics',
    price: 1000,
    countInStock: 6,
    rating: 3,
    numReviews: 172,
},

{
    name: 'STOM FORD Tuscan Leather Intense - Eau De Parfum 100 ml',
    image: '/images/tom.jpg',
    description: 'Eau de Parfum - 100ml',
    brand: 'Tom Ford',
    category: 'Personal Care',
    price: 67,
    countInStock: 64,
    rating: 5.3,
    numReviews: 1722,
},
]

export default products;