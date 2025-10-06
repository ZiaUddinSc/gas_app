import { icons, images } from "../constants";

export const userAddresses = [
    {
        id: "1",
        name: "Home",
        address: "364 Stillwater Ave, Attleboro, MA 02703",
    },
    {
        id: "2",
        name: "Office",
        address: "73 Virginia Rd, Cuyahoga Falls, OH 44221",
    },
    {
        id: "3",
        name: "Mall Plaza",
        address: "123 Main St, San Francisco, CA 94107",
    },
    {
        id: "4",
        name: "Garden Park",
        address: "600 Bloom St, Portland, OR 97201",
    },
    {
        id: "5",
        name: "Grand City Park",
        address: "26 State St Daphne, AL 36526"
    },
    {
        id: "6",
        name: "Town Square",
        address: "20 Applegate St. Hoboken, NJ 07030"
    },
    {
        id: "7",
        name: "Bank",
        address: "917 W Pine Street Easton, PA 0423"
    }
];

export const faqKeywords = [
    {
        id: "1",
        name: "General"
    },
    {
        id: "2",
        name: "Account"
    },
    {
        id: "3",
        name: "Security"
    },
    {
        id: "4",
        name: "Ordering"
    },
    {
        id: "5",
        name: "Payment"
    }
];

export const faqs = [
    {
        question: 'How do I place an order on the app?',
        answer: 'To place an order, simply browse through our product catalog, select the items you want, add them to your cart, and proceed to checkout to confirm your order.',
        type: "General"
    },
    {
        question: 'Can I view product details, such as specifications and availability?',
        answer: 'Yes, you can view detailed product information including specifications, availability, and customer reviews. Simply navigate to the product page within the app.',
        type: "General"
    },
    {
        question: 'What should I do if I need to cancel or modify an order?',
        answer: 'To cancel or modify an order, go to the "My Orders" section, find your order, and follow the provided options to make changes.',
        type: "Account"
    },
    {
        question: 'How can I find products from specific categories or brands?',
        answer: 'You can use the app’s search filters to find products from specific categories or brands. Filter results by categories such as electronics or clothing.',
        type: "Ordering"
    },
    {
        question: 'Is there a way to make payments for orders within the app?',
        answer: 'Yes, you can securely make payments for orders using various payment methods available in the app, including credit/debit cards and digital wallets.',
        type: "Payment"
    },
    {
        question: 'Are my personal details and order information kept secure?',
        answer: 'Yes, we prioritize the security and confidentiality of your personal details and order information. Our app complies with strict privacy and data protection standards.',
        type: "Security"
    },
    {
        question: 'Can I request assistance with special product requirements or preferences?',
        answer: "Yes, you can request assistance with special product requirements or preferences during the ordering process. Simply specify your preferences, and we'll do our best to accommodate them.",
        type: "General"
    },
    {
        question: 'How can I provide feedback or review my shopping experience?',
        answer: 'After receiving your order, you can provide feedback and review your shopping experience through the app’s rating and review system. Your feedback helps us improve our services for future orders.',
        type: "General"
    },
    {
        question: 'Is customer support available through this app?',
        answer: 'While we facilitate online shopping, our app is not for customer support. For assistance, please contact our support team through the designated channels provided in the app.',
        type: "General"
    },
];

export const friends = [
    {
        id: "1",
        name: "Tynisa Obey",
        phoneNumber: "+1-300-400-0135",
        avatar: images.user1,
    },
    {
        id: "2",
        name: "Florencio Dorance",
        phoneNumber: "+1-309-900-0135",
        avatar: images.user2,
    },
    {
        id: "3",
        name: "Chantal Shelburne",
        phoneNumber: "+1-400-100-1009",
        avatar: images.user3,
    },
    {
        id: "4",
        name: "Maryland Winkles",
        phoneNumber: "+1-970-200-4550",
        avatar: images.user4,
    },
    {
        id: "5",
        name: "Rodolfo Goode",
        phoneNumber: "+1-100-200-9800",
        avatar: images.user5,
    },
    {
        id: "6",
        name: "Benny Spanbauer",
        phoneNumber: "+1-780-200-9800",
        avatar: images.user6,
    },
    {
        id: "7",
        name: "Tyra Dillon",
        phoneNumber: "+1-943-230-9899",
        avatar: images.user7,
    },
    {
        id: "8",
        name: "Jamel Eusobio",
        phoneNumber: "+1-900-234-9899",
        avatar: images.user8,
    },
    {
        id: "9",
        name: "Pedro Haurad",
        phoneNumber: "+1-240-234-9899",
        avatar: images.user9
    },
    {
        id: "10",
        name: "Clinton Mcclure",
        phoneNumber: "+1-500-234-4555",
        avatar: images.user10
    },
];

export const transactionHistory = [
    {
        id: "1",
        image: images.user1,
        name: "Daniel Austin",
        date: "Dec 20, 2024 | 10:00 AM",
        type: "Purchase Expense",
        amount: "$14"
    },
    {
        id: "2",
        image: images.user2,
        name: "Top Up Wallet",
        date: "Dec 16, 2024 | 13:34 PM",
        type: "Top Up",
        amount: "$80"
    },
    {
        id: "3",
        image: images.user3,
        name: "Sarah Wilson",
        date: "Dec 14, 2024 | 11:39 AM",
        type: "Purchase Expense",
        amount: "$32"
    },
    {
        id: "4",
        image: images.user2,
        name: "Daniel Austion",
        date: "Dec 10, 2024 | 09:32 AM",
        type: "Top Up",
        amount: "$112"
    },
    {
        id: "5",
        image: images.user5,
        name: "Benny Spanbauleur",
        date: "Dec 09, 2024 | 10:08 AM",
        type: "Purchase Expense",
        amount: "$43"
    },
    {
        id: "6",
        image: images.user6,
        name: "Roselle Dorrence",
        date: "Dec 08, 2024 | 09:12 AM",
        type: "Purchase Expense",
        amount: "$22"
    },
    {
        id: "7",
        image: images.user2,
        name: "Daniel Austion",
        date: "Dec 08, 2024 | 16:28 PM",
        type: "Top Up",
        amount: "$200"
    },
    {
        id: "8",
        image: images.user2,
        name: "Daniel Austion",
        date: "Dec 07, 2024 | 15:12 PM",
        type: "Top Up",
        amount: "$120"
    },
    {
        id: "9",
        image: images.user2,
        name: "Daniel Austion",
        date: "Dec 07, 2024 | 22:12 PM",
        type: "Top Up",
        amount: "$20"
    },
    {
        id: "10",
        image: images.user8,
        name: "Lucky Luck",
        date: "Dec 06, 2024 | 10:08 AM",
        type: "Purchase Expense",
        amount: "$12"
    },
    {
        id: "11",
        image: images.user2,
        name: "Jennifer Lucie",
        date: "Dec 03, 2024 | 11:48 AM",
        type: "Top Up",
        amount: "$45"
    }
];

export const messsagesData = [
    {
        id: "1",
        fullName: "Jhon Smith",
        userImg: images.user1,
        lastSeen: "2023-11-16T04:52:06.501Z",
        lastMessage: 'I love you. see you soon baby',
        messageInQueue: 2,
        lastMessageTime: "12:25 PM",
        isOnline: true,
    },
    {
        id: "2",
        fullName: "Anuska Sharma",
        userImg: images.user2,
        lastSeen: "2023-11-18T04:52:06.501Z",
        lastMessage: 'I Know. you are so busy man.',
        messageInQueue: 0,
        lastMessageTime: "12:15 PM",
        isOnline: false
    },
    {
        id: "3",
        fullName: "Virat Kohili",
        userImg: images.user3,
        lastSeen: "2023-11-20T04:52:06.501Z",
        lastMessage: 'Ok, see u soon',
        messageInQueue: 0,
        lastMessageTime: "09:12 PM",
        isOnline: true
    },
    {
        id: "4",
        fullName: "Shikhor Dhaon",
        userImg: images.user4,
        lastSeen: "2023-11-18T04:52:06.501Z",
        lastMessage: 'Great! Do you Love it.',
        messageInQueue: 0,
        lastMessageTime: "04:12 PM",
        isOnline: true
    },
    {
        id: "5",
        fullName: "Shakib Hasan",
        userImg: images.user5,
        lastSeen: "2023-11-21T04:52:06.501Z",
        lastMessage: 'Thank you !',
        messageInQueue: 2,
        lastMessageTime: "10:30 AM",
        isOnline: true
    },
    {
        id: "6",
        fullName: "Jacksoon",
        userImg: images.user6,
        lastSeen: "2023-11-20T04:52:06.501Z",
        lastMessage: 'Do you want to go out dinner',
        messageInQueue: 3,
        lastMessageTime: "10:05 PM",
        isOnline: false
    },
    {
        id: "7",
        fullName: "Tom Jerry",
        userImg: images.user7,
        lastSeen: "2023-11-20T04:52:06.501Z",
        lastMessage: 'Do you want to go out dinner',
        messageInQueue: 2,
        lastMessageTime: "11:05 PM",
        isOnline: true
    },
    {
        id: "8",
        fullName: "Lucky Luck",
        userImg: images.user8,
        lastSeen: "2023-11-20T04:52:06.501Z",
        lastMessage: 'Can you share the design with me?',
        messageInQueue: 2,
        lastMessageTime: "09:11 PM",
        isOnline: true
    },
    {
        id: "9",
        fullName: "Nate Jack",
        userImg: images.user9,
        lastSeen: "2023-11-20T04:52:06.501Z",
        lastMessage: 'Tell me what you want?',
        messageInQueue: 0,
        lastMessageTime: "06:43 PM",
        isOnline: true
    }
];

export const callData = [
    {
        id: "1",
        fullName: "Roselle Erhman",
        userImg: images.user10,
        status: "33 WREKIN AVENUE,NEWPORT, TF10 7HQ",
        date: "Dec 19, 2024"
    },
    {
        id: "2",
        fullName: "Willard Purnell",
        userImg: images.user9,
        status: "Outgoing",
        date: "Dec 17, 2024"
    },
    {
        id: "3",
        fullName: "Charlotte Hanlin",
        userImg: images.user8,
        status: "Missed",
        date: "Dec 16, 2024"
    },
    {
        id: "4",
        fullName: "Merlin Kevin",
        userImg: images.user7,
        status: "Missed",
        date: "Dec 16, 2024"
    },
    {
        id: "5",
        fullName: "Lavern Laboy",
        userImg: images.user6,
        status: "Outgoing",
        date: "Dec 16, 2024"
    },
    {
        id: "6",
        fullName: "Phyllis Godley",
        userImg: images.user5,
        status: "Incoming",
        date: "Dec 15, 2024"
    },
    {
        id: "7",
        fullName: "Tyra Dillon",
        userImg: images.user4,
        status: "Outgoing",
        date: "Dec 15, 2024"
    },
    {
        id: "8",
        fullName: "Marci Center",
        userImg: images.user3,
        status: "Missed",
        date: "Dec 15, 2024"
    },
    {
        id: "9",
        fullName: "Clinton Mccure",
        userImg: images.user2,
        status: "Outgoing",
        date: "Dec 15, 2024"
    },
];

export const banners = [
    {
        id: 1,
        discount: '30 Days',
        discountName: "Invite a Gas Engineer →",
        bottomTitle: '30 Days Free for them,30 Days for You',
        bottomSubtitle: 'No limits: The more you invite, the more FREE time you unlock!'
    },
    // {
    //     id: 2,
    //     discount: '50%',
    //     discountName: "Weekend Sale",
    //     bottomTitle: 'Special discount for weekend orderings!',
    //     bottomSubtitle: 'This weekend only!'
    // },
    // {
    //     id: 3,
    //     discount: '30%',
    //     discountName: "Limited Time Offer",
    //     bottomTitle: 'Hurry up! Limited time offer!',
    //     bottomSubtitle: 'Valid until supplies last!'
    // }
];

export const categories = [
    {
        id: "0",
        name: "All",
        icon: icons.category,
        iconColor: "rgba(51, 94, 247, 1)",
        backgroundColor: "rgba(51, 94, 247, .12)",
        onPress: null
    },
    {
        id: "1",
        name: "Customers",
        icon: icons.users2,
        iconColor: "rgba(51, 94, 247, 1)",
        backgroundColor: "rgba(51, 94, 247, .12)",
        onPress: "customers"
    },
    {
        id: "2",
        name: "Jobs",
        icon: icons.job,
        iconColor: "rgba(255, 152, 31, 1)",
        backgroundColor: "rgba(255, 152, 31, .12)",
        onPress: "myjobs"
    },
    {
        id: "3",
        name: "Existing Records",
        icon: icons.records,
        iconColor: "rgba(26, 150, 240, 1)",
        backgroundColor: "rgba(26, 150, 240,.12)",
        onPress: "categorytable"
    },
    {
        id: "4",
        name: "Boiler Manual",
        icon: icons.manual,
        iconColor: "rgba(255, 192, 45, 1)",
        backgroundColor: "rgba(255, 192, 45,.12)",
        onPress: "boilermanual"
    },
    {
        id: "5",
        name: "Gas Calculator",
        icon: icons.calculator,
        iconColor: "rgba(245, 67, 54, 1)",
        backgroundColor: "rgba(245, 67, 54,.12)",
        onPress: "gascalculator"
    },
   
    // {
    //     id: "6",
    //     name: "Cupboard",
    //     icon: icons.cupboard1,
    //     iconColor: "rgba(74, 175, 87, 1)",
    //     backgroundColor: "rgba(74, 175, 87,.12)",
    //     onPress: "categorycupboard"
    // },
    // {
    //     id: "7",
    //     name: "Vase",
    //     icon: icons.vase1,
    //     iconColor: "rgba(0, 188, 211, 1)",
    //     backgroundColor: "rgba(0, 188, 211,.12)",
    //     onPress: "categoryvase"
    // },
    // {
    //     id: "8",
    //     name: "Others",
    //     icon: icons.more2,
    //     iconColor: "rgba(114, 16, 255, 1)",
    //     backgroundColor: "rgba(114, 16, 255, .12)",
    //     onPress: null
    // }
];

export const certificates = [

    {
        id: "0",
        name: "All",
        short_name: "All",
        icon: icons.category,
        iconColor: "rgba(51, 94, 247, 1)",
        backgroundColor: "rgba(51, 94, 247, .12)",
        onPress: null
    },
    {
        id: "1",
        name: "Customers",
        icon: icons.landlord,
        short_name: "CP12 Landlord",
        iconColor: "rgba(51, 94, 247, 1)",
        backgroundColor: "rgba(51, 94, 247, .12)",
        onPress: "customers"
    },
    {
        id: "2",
        name: "Jobs",
        short_name: "CP12 Homeowner",
        icon: icons.homeowner,
        iconColor: "rgba(255, 152, 31, 1)",
        backgroundColor: "rgba(255, 152, 31, .12)",
        onPress: "myjobs"
    },
    {
        id: "3",
        name: "Existing Records",
        icon: icons.warning,
        short_name: "CP14 Warning",
        iconColor: "rgba(26, 150, 240, 1)",
        backgroundColor: "rgba(26, 150, 240,.12)",
        onPress: "categorytable"
    },
    {
        id: "4",
        name: "Maintainance",
        short_name: "Maintainance",
        icon: icons.maintenance,
        iconColor: "rgba(255, 192, 45, 1)",
        backgroundColor: "rgba(255, 192, 45,.12)",
        onPress: "boilermanual"
    },
    {
        id: "5",
        name: "Gas Calculator",
        icon: icons.breakdown,
        short_name: "Breakdown",
        iconColor: "rgba(245, 67, 54, 1)",
        backgroundColor: "rgba(245, 67, 54,.12)",
        onPress: "gascalculator"
    },
    {
        id: "6",
        name: "Gas Calculator",
        icon: icons.commissioning,
        short_name: "Commissioning",
        iconColor: "rgba(245, 67, 54, 1)",
        backgroundColor: "rgba(245, 67, 54,.12)",
        onPress: "gascalculator"
    },
   
    // {
    //     id: "6",
    //     name: "Cupboard",
    //     icon: icons.cupboard1,
    //     iconColor: "rgba(74, 175, 87, 1)",
    //     backgroundColor: "rgba(74, 175, 87,.12)",
    //     onPress: "categorycupboard"
    // },
    // {
    //     id: "7",
    //     name: "Vase",
    //     icon: icons.vase1,
    //     iconColor: "rgba(0, 188, 211, 1)",
    //     backgroundColor: "rgba(0, 188, 211,.12)",
    //     onPress: "categoryvase"
    // },
    // {
    //     id: "8",
    //     name: "Others",
    //     icon: icons.more2,
    //     iconColor: "rgba(114, 16, 255, 1)",
    //     backgroundColor: "rgba(114, 16, 255, .12)",
    //     onPress: null
    // }
];

export const sofas = [
    {
        id: "1",
        name: "Plush Velvet Sofa",
        image: images.sofa1,
        price: "485.00",
        numReviews: 143,
        rating: 4.5,
        quantity: 1300,
        numSolds: 9373,
        navigate: "sofadetails"
    },
    {
        id: "2",
        name: "Leather Sectional Sofa",
        image: images.sofa2,
        price: "1200.00",
        numReviews: 98,
        rating: 4.2,
        quantity: 500,
        numSolds: 562,
        navigate: "sofadetails"
    },
    {
        id: "3",
        name: "Fabric Loveseat",
        image: images.sofa3,
        price: "750.00",
        numReviews: 205,
        rating: 4.8,
        quantity: 300,
        numSolds: 1689,
        navigate: "sofadetails"
    },
    {
        id: "4",
        name: "Convertible Sleeper Sofa",
        image: images.sofa4,
        price: "850.00",
        numReviews: 72,
        rating: 4.0,
        quantity: 700,
        numSolds: 423,
        navigate: "sofadetails"
    },
    {
        id: "5",
        name: "Mid-century Modern Sofa",
        image: images.sofa5,
        price: "950.00",
        numReviews: 120,
        rating: 4.3,
        quantity: 400,
        numSolds: 987,
        navigate: "sofadetails"
    },
    {
        id: "6",
        name: "L-shaped Sectional Sofa",
        image: images.sofa6,
        price: "1400.00",
        numReviews: 64,
        rating: 4.1,
        quantity: 250,
        numSolds: 325,
        navigate: "sofadetails"
    },
    {
        id: "7",
        name: "Microfiber Recliner Sofa",
        image: images.sofa7,
        price: "1050.00",
        numReviews: 85,
        rating: 4.4,
        quantity: 600,
        numSolds: 746,
        navigate: "sofadetails"
    },
    {
        id: "8",
        name: "Modular Sofa Set",
        image: images.sofa8,
        price: "1600.00",
        numReviews: 150,
        rating: 4.6,
        quantity: 200,
        numSolds: 1325,
        navigate: "sofadetails"
    },
    {
        id: "9",
        name: "Chaise Lounge Sofa",
        image: images.sofa9,
        price: "1100.00",
        numReviews: 110,
        rating: 4.2,
        quantity: 350,
        numSolds: 845,
        navigate: "sofadetails"
    },
    {
        id: "10",
        name: "Traditional Sofa",
        image: images.sofa10,
        price: "900.00",
        numReviews: 93,
        rating: 4.3,
        quantity: 450,
        numSolds: 632,
        navigate: "sofadetails"
    },
    {
        id: "11",
        name: "Sofa Bed",
        image: images.sofa11,
        price: "800.00",
        numReviews: 78,
        rating: 4.0,
        quantity: 280,
        numSolds: 514,
        navigate: "sofadetails"
    },
    {
        id: "12",
        name: "Rustic Sofa",
        image: images.sofa12,
        price: "950.00",
        numReviews: 105,
        rating: 4.2,
        quantity: 380,
        numSolds: 701,
        navigate: "sofadetails"
    }
];


export const chairs = [
    {
        id: "1",
        name: "Ergonomic Office Chair",
        image: images.chair1,
        price: "320.00",
        numReviews: 405,
        rating: 4.9,
        quantity: 40000,
        numSolds: 9752,
        categoryId: "2",
        navigate: "chairdetails"
    },
    {
        id: "2",
        name: "Swivel Desk Chair",
        image: images.chair2,
        price: "120.00",
        numReviews: 240,
        rating: 4.5,
        quantity: 15000,
        numSolds: 6321,
        categoryId: "2",
        navigate: "chairdetails"
    },
    {
        id: "3",
        name: "Leather Executive Chair",
        image: images.chair3,
        price: "250.00",
        numReviews: 180,
        rating: 4.3,
        quantity: 10000,
        numSolds: 4236,
        categoryId: "2",
        navigate: "chairdetails"
    },
    {
        id: "4",
        name: "Dining Chair Set",
        image: images.chair4,
        price: "150.00",
        numReviews: 312,
        rating: 4.7,
        quantity: 8000,
        numSolds: 8547,
        categoryId: "2",
        navigate: "chairdetails"
    },
    {
        id: "5",
        name: "Accent Chair",
        image: images.chair5,
        price: "180.00",
        numReviews: 96,
        rating: 4.2,
        quantity: 5000,
        numSolds: 2156,
        categoryId: "2",
        navigate: "chairdetails"
    },
    {
        id: "6",
        name: "Rocking Chair",
        image: images.chair6,
        price: "120.00",
        numReviews: 178,
        rating: 4.4,
        quantity: 7000,
        numSolds: 3965,
        categoryId: "2",
        navigate: "chairdetails"
    },
    {
        id: "7",
        name: "Bar Stool",
        image: images.chair7,
        price: "80.00",
        numReviews: 132,
        rating: 4.1,
        quantity: 6000,
        numSolds: 2854,
        categoryId: "2",
        navigate: "chairdetails"
    },
    {
        id: "8",
        name: "Recliner Chair",
        image: images.chair8,
        price: "300.00",
        numReviews: 215,
        rating: 4.6,
        quantity: 9000,
        numSolds: 6543,
        categoryId: "2",
        navigate: "chairdetails"
    },
    {
        id: "9",
        name: "Folding Chair",
        image: images.chair9,
        price: "40.00",
        numReviews: 189,
        rating: 4.3,
        quantity: 7500,
        numSolds: 4875,
        categoryId: "2",
        navigate: "chairdetails"
    },
    {
        id: "10",
        name: "Lounge Chair",
        image: images.chair10,
        price: "200.00",
        numReviews: 124,
        rating: 4.0,
        quantity: 4000,
        numSolds: 1987,
        categoryId: "2",
        navigate: "chairdetails"
    },
    {
        id: "11",
        name: "Bean Bag Chair",
        image: images.chair11,
        price: "60.00",
        numReviews: 143,
        rating: 4.2,
        quantity: 6500,
        numSolds: 3245,
        categoryId: "2",
        navigate: "chairdetails"
    },
    {
        id: "12",
        name: "Armchair",
        image: images.chair12,
        price: "150.00",
        numReviews: 156,
        rating: 4.4,
        quantity: 8500,
        numSolds: 5621,
        categoryId: "2",
        navigate: "chairdetails"
    }
];


export const tables = [
    {
        id: "1",
        name: "Wooden Dining Table",
        image: images.table1,
        price: "320.00",
        numReviews: 156,
        rating: 4.4,
        quantity: 8500,
        numSolds: 5621,
        categoryId: "3",
        navigate: "tabledetails"
    },
    {
        id: "2",
        name: "Glass Coffee Table",
        image: images.table2,
        price: "132.00",
        numReviews: 300,
        rating: 4.9,
        quantity: 8500,
        numSolds: 459,
        categoryId: "3",
        navigate: "tabledetails"
    },
    {
        id: "3",
        name: "Marble Console Table",
        image: images.table3,
        price: "165.00",
        numReviews: 120,
        rating: 4.9,
        quantity: 50003,
        numSolds: 1230,
        categoryId: "3",
        navigate: "tabledetails"
    },
    {
        id: "4",
        name: "Extendable Dining Table",
        image: images.table4,
        price: "230.00",
        numReviews: 945,
        rating: 4.8,
        quantity: 4000,
        numSolds: 980,
        categoryId: "3",
        navigate: "tabledetails"
    },
    {
        id: "5",
        name: "Round Side Table",
        image: images.table5,
        price: "265.00",
        numReviews: 300,
        rating: 4.7,
        quantity: 3200,
        numSolds: 980,
        categoryId: "3",
        navigate: "tabledetails"
    },
    {
        id: "6",
        name: "Study Desk",
        image: images.table6,
        price: "430.00",
        numReviews: 190,
        rating: 4.9,
        quantity: 3200,
        numSolds: 1242,
        categoryId: "3",
        navigate: "tabledetails"
    },
    {
        id: "7",
        name: "Computer Desk",
        image: images.table7,
        price: "275.00",
        numReviews: 640,
        rating: 4.8,
        quantity: 4000,
        numSolds: 2300,
        categoryId: "3",
        navigate: "tabledetails"
    },
    {
        id: "8",
        name: "Standing Desk",
        image: images.table8,
        price: "255.00",
        numReviews: 650,
        rating: 4.6,
        quantity: 56000,
        numSolds: 7464,
        categoryId: "3",
        navigate: "tabledetails"
    },
    {
        id: "9",
        name: "Folding Table",
        image: images.table9,
        price: "128.35",
        numReviews: 112,
        rating: 4.8,
        quantity: 56000,
        numSolds: 734,
        categoryId: "3",
        navigate: "tabledetails"
    },
    {
        id: "10",
        name: "Bedside Table",
        image: images.table10,
        price: "104.45",
        numReviews: 105,
        rating: 4.7,
        quantity: 56000,
        numSolds: 1460,
        categoryId: "3",
        navigate: "tabledetails"
    },
    {
        id: "11",
        name: "Workstation Desk",
        image: images.table11,
        price: "125.00",
        numReviews: 112,
        rating: 4.8,
        quantity: 56000,
        numSolds: 2003,
        categoryId: "3",
        navigate: "tabledetails"
    },
    {
        id: "12",
        name: "Bar Table",
        image: images.table12,
        price: "155.00",
        numReviews: 210,
        rating: 4.9,
        quantity: 60000,
        numSolds: 1200,
        categoryId: "3",
        navigate: "tabledetails"
    },
];


export const kitchens = [
    {
        id: "1",
        name: "Silicia Silver Knife",
        image: images.kitchen1,
        price: "120.00",
        numReviews: 160,
        rating: 4.3,
        quantity: 21000,
        numSolds: 752,
        categoryId: "4",
        navigate: "kitchendetails"
    },
    {
        id: "2",
        name: "Stainless Steel Cookware Set",
        image: images.kitchen2,
        price: "250.00",
        numReviews: 220,
        rating: 4.6,
        quantity: 15000,
        numSolds: 987,
        categoryId: "4",
        navigate: "kitchendetails"
    },
    {
        id: "3",
        name: "Non-Stick Frying Pan",
        image: images.kitchen3,
        price: "40.00",
        numReviews: 180,
        rating: 4.2,
        quantity: 18000,
        numSolds: 632,
        categoryId: "4",
        navigate: "kitchendetails"
    },
    {
        id: "4",
        name: "Chef's Knife",
        image: images.kitchen4,
        price: "80.00",
        numReviews: 140,
        rating: 4.1,
        quantity: 12000,
        numSolds: 514,
        categoryId: "4",
        navigate: "kitchendetails"
    },
    {
        id: "5",
        name: "Cast Iron Skillet",
        image: images.kitchen5,
        price: "60.00",
        numReviews: 200,
        rating: 4.5,
        quantity: 14000,
        numSolds: 845,
        categoryId: "4",
        navigate: "kitchendetails"
    },
    {
        id: "6",
        name: "Food Processor",
        image: images.kitchen6,
        price: "150.00",
        numReviews: 130,
        rating: 4.4,
        quantity: 10000,
        numSolds: 632,
        categoryId: "4",
        navigate: "kitchendetails"
    },
    {
        id: "7",
        name: "Blender",
        image: images.kitchen7,
        price: "100.00",
        numReviews: 190,
        rating: 4.3,
        quantity: 8000,
        numSolds: 426,
        categoryId: "4",
        navigate: "kitchendetails"
    },
    {
        id: "8",
        name: "Toaster Oven",
        image: images.kitchen8,
        price: "80.00",
        numReviews: 150,
        rating: 4.2,
        quantity: 9000,
        numSolds: 752,
        categoryId: "4",
        navigate: "kitchendetails"
    },
    {
        id: "9",
        name: "Coffee Maker",
        image: images.kitchen9,
        price: "70.00",
        numReviews: 170,
        rating: 4.4,
        quantity: 11000,
        numSolds: 654,
        categoryId: "4",
        navigate: "kitchendetails"
    },
    {
        id: "10",
        name: "Electric Kettle",
        image: images.kitchen10,
        price: "45.00",
        numReviews: 120,
        rating: 4.0,
        quantity: 7000,
        numSolds: 589,
        categoryId: "4",
        navigate: "kitchendetails"
    },
    {
        id: "11",
        name: "Mixer",
        image: images.kitchen11,
        price: "120.00",
        numReviews: 140,
        rating: 4.1,
        quantity: 7500,
        numSolds: 487,
        categoryId: "4",
        navigate: "kitchendetails"
    },
    {
        id: "12",
        name: "Rice Cooker",
        image: images.kitchen12,
        price: "55.00",
        numReviews: 160,
        rating: 4.3,
        quantity: 8500,
        numSolds: 752,
        categoryId: "4",
        navigate: "kitchendetails"
    }
];

export const lamps = [
    {
        id: "1",
        name: "Vintage Desk Lamp",
        image: images.lamp1,
        price: "120.00",
        numReviews: 160,
        rating: 4.3,
        quantity: 21000,
        numSolds: 752,
        categoryId: "5",
        navigate: "lampdetails"
    },
    {
        id: "2",
        name: "Modern Floor Lamp",
        image: images.lamp2,
        price: "250.00",
        numReviews: 220,
        rating: 4.6,
        quantity: 15000,
        numSolds: 987,
        categoryId: "5",
        navigate: "lampdetails"
    },
    {
        id: "3",
        name: "Minimalist Table Lamp",
        image: images.lamp3,
        price: "40.00",
        numReviews: 180,
        rating: 4.2,
        quantity: 18000,
        numSolds: 632,
        categoryId: "5",
        navigate: "lampdetails"
    },
    {
        id: "4",
        name: "Industrial Pendant Lamp",
        image: images.lamp4,
        price: "80.00",
        numReviews: 140,
        rating: 4.1,
        quantity: 12000,
        numSolds: 514,
        categoryId: "5",
        navigate: "lampdetails"
    },
    {
        id: "5",
        name: "Art Deco Table Lamp",
        image: images.lamp5,
        price: "60.00",
        numReviews: 200,
        rating: 4.5,
        quantity: 14000,
        numSolds: 845,
        categoryId: "5",
        navigate: "lampdetails"
    },
    {
        id: "6",
        name: "Tiffany Style Lamp",
        image: images.lamp6,
        price: "150.00",
        numReviews: 130,
        rating: 4.4,
        quantity: 10000,
        numSolds: 632,
        categoryId: "5",
        navigate: "lampdetails"
    },
    {
        id: "7",
        name: "Crystal Chandelier",
        image: images.lamp7,
        price: "100.00",
        numReviews: 190,
        rating: 4.3,
        quantity: 8000,
        numSolds: 426,
        categoryId: "5",
        navigate: "lampdetails"
    },
    {
        id: "8",
        name: "Adjustable Desk Lamp",
        image: images.lamp8,
        price: "80.00",
        numReviews: 150,
        rating: 4.2,
        quantity: 9000,
        numSolds: 752,
        categoryId: "5",
        navigate: "lampdetails"
    },
    {
        id: "9",
        name: "Swing Arm Wall Lamp",
        image: images.lamp9,
        price: "70.00",
        numReviews: 170,
        rating: 4.4,
        quantity: 11000,
        numSolds: 654,
        categoryId: "5",
        navigate: "lampdetails"
    },
    {
        id: "10",
        name: "Vintage Hanging Lamp",
        image: images.lamp10,
        price: "45.00",
        numReviews: 120,
        rating: 4.0,
        quantity: 7000,
        numSolds: 589,
        categoryId: "5",
        navigate: "lampdetails"
    },
    {
        id: "11",
        name: "Rustic Table Lamp",
        image: images.lamp11,
        price: "120.00",
        numReviews: 140,
        rating: 4.1,
        quantity: 7500,
        numSolds: 487,
        categoryId: "5",
        navigate: "lampdetails"
    },
    {
        id: "12",
        name: "Art Nouveau Lamp",
        image: images.lamp12,
        price: "55.00",
        numReviews: 160,
        rating: 4.3,
        quantity: 8500,
        numSolds: 752,
        categoryId: "5",
        navigate: "lampdetails"
    }
];

export const cupboards = [
    {
        id: "1",
        name: "Wooden Wardrobe",
        image: images.cupboard1,
        price: "375.00",
        numReviews: 160,
        rating: 4.3,
        quantity: 8500,
        numSolds: 752,
        categoryId: "6",
        navigate: "cupboarddetails"
    },
    {
        id: "2",
        name: "Sliding Door Cupboard",
        image: images.cupboard2,
        price: "250.00",
        numReviews: 220,
        rating: 4.6,
        quantity: 15000,
        numSolds: 987,
        categoryId: "6",
        navigate: "cupboarddetails"
    },
    {
        id: "3",
        name: "Vintage Cupboard",
        image: images.cupboard3,
        price: "400.00",
        numReviews: 180,
        rating: 4.2,
        quantity: 18000,
        numSolds: 632,
        categoryId: "6",
        navigate: "cupboarddetails"
    },
    {
        id: "4",
        name: "Storage Armoire",
        image: images.cupboard4,
        price: "200.00",
        numReviews: 140,
        rating: 4.1,
        quantity: 12000,
        numSolds: 514,
        categoryId: "6",
        navigate: "cupboarddetails"
    },
    {
        id: "5",
        name: "Mirrored Cupboard",
        image: images.cupboard5,
        price: "350.00",
        numReviews: 200,
        rating: 4.5,
        quantity: 14000,
        numSolds: 845,
        categoryId: "6",
        navigate: "cupboarddetails"
    },
    {
        id: "6",
        name: "Corner Cupboard",
        image: images.cupboard6,
        price: "300.00",
        numReviews: 130,
        rating: 4.4,
        quantity: 10000,
        numSolds: 632,
        categoryId: "6",
        navigate: "cupboarddetails"
    },
    {
        id: "7",
        name: "Modular Cupboard Set",
        image: images.cupboard7,
        price: "450.00",
        numReviews: 190,
        rating: 4.3,
        quantity: 8000,
        numSolds: 426,
        categoryId: "6",
        navigate: "cupboarddetails"
    },
    {
        id: "8",
        name: "Open Wardrobe",
        image: images.cupboard8,
        price: "180.00",
        numReviews: 150,
        rating: 4.2,
        quantity: 9000,
        numSolds: 752,
        categoryId: "6",
        navigate: "cupboarddetails"
    },
    {
        id: "9",
        name: "Compact Cupboard",
        image: images.cupboard9,
        price: "120.00",
        numReviews: 170,
        rating: 4.4,
        quantity: 11000,
        numSolds: 654,
        categoryId: "6",
        navigate: "cupboarddetails"
    },
    {
        id: "10",
        name: "Kids' Wardrobe",
        image: images.cupboard10,
        price: "200.00",
        numReviews: 130,
        rating: 4.2,
        quantity: 12000,
        numSolds: 589,
        categoryId: "6",
        navigate: "cupboarddetails"
    },
    {
        id: "11",
        name: "Fitted Cupboard",
        image: images.cupboard11,
        price: "300.00",
        numReviews: 140,
        rating: 4.1,
        quantity: 10500,
        numSolds: 487,
        categoryId: "6",
        navigate: "cupboarddetails"
    },
    {
        id: "12",
        name: "Walk-in Closet",
        image: images.cupboard12,
        price: "500.00",
        numReviews: 160,
        rating: 4.3,
        quantity: 12500,
        numSolds: 752,
        categoryId: "6",
        navigate: "cupboarddetails"
    }
];


export const vases = [
    {
        id: "1",
        name: "Ceramic Flower Vase",
        image: images.vase1,
        price: "45.00",
        numReviews: 160,
        rating: 4.5,
        quantity: 4200,
        numSolds: 752,
        categoryId: "11",
        navigate: "vasedetails"
    },
    {
        id: "2",
        name: "Glass Vase with Floral Design",
        image: images.vase2,
        price: "55.00",
        numReviews: 112,
        rating: 4.8,
        quantity: 4200,
        numSolds: 3240,
        categoryId: "11",
        navigate: "vasedetails"
    },
    {
        id: "3",
        name: "Metallic Decorative Vase",
        image: images.vase3,
        price: "65.00",
        numReviews: 210,
        rating: 4.7,
        quantity: 4200,
        numSolds: 1092,
        categoryId: "11",
        navigate: "vasedetails"
    },
    {
        id: "4",
        name: "Crystal Vase with Etched Pattern",
        image: images.vase4,
        price: "80.00",
        numReviews: 982,
        rating: 4.9,
        quantity: 4200,
        numSolds: 2782,
        categoryId: "11",
        navigate: "vasedetails"
    },
    {
        id: "5",
        name: "Porcelain Vase with Hand-painted Flowers",
        image: images.vase5,
        price: "70.00",
        numReviews: 832,
        rating: 4.5,
        quantity: 4200,
        numSolds: 2500,
        categoryId: "11",
        navigate: "vasedetails"
    },
    {
        id: "6",
        name: "Marble Vase",
        image: images.vase6,
        price: "120.00",
        numReviews: 870,
        rating: 4.9,
        quantity: 4200,
        numSolds: 1912,
        categoryId: "11",
        navigate: "vasedetails"
    },
    {
        id: "7",
        name: "Modern Ceramic Vase",
        image: images.vase7,
        price: "34.50",
        numReviews: 150,
        rating: 4.8,
        quantity: 4200,
        numSolds: 2300,
        categoryId: "11",
        navigate: "vasedetails"
    },
    {
        id: "8",
        name: "Wooden Vase with Carvings",
        image: images.vase8,
        price: "39.00",
        numReviews: 128,
        rating: 4.4,
        quantity: 4200,
        numSolds: 2768,
        categoryId: "11",
        navigate: "vasedetails"
    },
    {
        id: "9",
        name: "Bamboo Vase",
        image: images.vase9,
        price: "50.00",
        numReviews: 120,
        rating: 4.7,
        quantity: 4200,
        numSolds: 2500,
        categoryId: "11",
        navigate: "vasedetails"
    },
    {
        id: "10",
        name: "Terra Cotta Vase",
        image: images.vase10,
        price: "60.00",
        numReviews: 459,
        rating: 4.8,
        quantity: 4200,
        numSolds: 2480,
        categoryId: "11",
        navigate: "vasedetails"
    },
    {
        id: "11",
        name: "Art Deco Vase",
        image: images.vase11,
        price: "70.00",
        numReviews: 1602,
        rating: 4.9,
        quantity: 4200,
        numSolds: 1231,
        categoryId: "11",
        navigate: "vasedetails"
    },
    {
        id: "12",
        name: "Hand-blown Glass Vase",
        image: images.vase12,
        price: "90.00",
        numReviews: 1439,
        rating: 4.5,
        quantity: 4300,
        numSolds: 1452,
        categoryId: "11",
        navigate: "vasedetails"
    }
];

export const products = {
    sofas,
    chairs,
    tables,
    kitchens,
    lamps,
    cupboards,
    vases
}

export const popularProducts = [
    {
        id: "1",
        name: "Wooden Vase with Carvings",
        image: images.vase8,
        price: "25.00",
        numReviews: 240,
        rating: 4.5,
        quantity: 15000,
        numSolds: 6321,
        categoryId: "11",
        navigate: "vasedetails"
    },
    {
        id: "2",
        name: "Art Nouveau Lamp",
        image: images.lamp12,
        price: "485.00",
        numReviews: 143,
        rating: 4.5,
        quantity: 1300,
        numSolds: 9373,
        categoryId: "5",
        navigate: "lampdetails"
    },
    {
        id: "3",
        name: "Walk-in Closet",
        image: images.cupboard12,
        price: "90.00",
        numReviews: 430,
        rating: 4.3,
        quantity: 1300,
        numSolds: 426,
        categoryId: "6",
        navigate: "cupboarddetails"
    },
    {
        id: "4",
        name: "Silicia Silver Knife",
        image: images.kitchen1,
        price: "120.00",
        numReviews: 156,
        rating: 4.4,
        quantity: 8500,
        numSolds: 5621,
        categoryId: "4",
        navigate: "kitchendetails"
    },
    {
        id: "5",
        name: "Minimalist Table Lamp",
        image: images.lamp3,
        price: "45.00",
        numReviews: 180,
        rating: 4.3,
        quantity: 10000,
        numSolds: 4236,
        categoryId: "5",
        navigate: "lampdetails"
    },
    {
        id: "6",
        name: "Folding Chair",
        image: images.chair9,
        price: "150.00",
        numReviews: 205,
        rating: 4.8,
        quantity: 300,
        numSolds: 1689,
        categoryId: "2",
        navigate: "chairdetails"
    },
    {
        id: "7",
        name: "Study Desk",
        image: images.table6,
        price: "132.00",
        numReviews: 300,
        rating: 4.9,
        quantity: 8500,
        numSolds: 459,
        categoryId: "3",
        navigate: "tabledetails"
    },
    {
        id: "8",
        name: "Modular Sofa Set",
        image: images.sofa8,
        price: "155.00",
        numReviews: 210,
        rating: 4.9,
        quantity: 60000,
        numSolds: 1200,
        categoryId: "1",
        navigate: "sofadetails"
    },
    {
        id: "9",
        name: "Rocking Chair",
        image: images.chair6,
        price: "165.00",
        numReviews: 120,
        rating: 4.9,
        quantity: 50003,
        numSolds: 1230,
        categoryId: "2",
        navigate: "chairdetails"
    },
    {
        id: "10",
        name: "Glass Coffee Table",
        image: images.table2,
        price: "450.00",
        numReviews: 180,
        rating: 4.8,
        quantity: 35000,
        numSolds: 987,
        categoryId: "3",
        navigate: "tabledetails"
    },
    {
        id: "11",
        name: "Chef's Knife",
        image: images.kitchen4,
        price: "25.00",
        numReviews: 98,
        rating: 4.2,
        quantity: 500,
        numSolds: 562,
        categoryId: "4",
        navigate: "kitchendetails"
    },
    {
        id: "12",
        name: "Adjustable Desk Lamp",
        image: images.lamp8,
        price: "75.00",
        numReviews: 150,
        rating: 4.5,
        quantity: 28000,
        numSolds: 632,
        categoryId: "5",
        navigate: "lampdetails"
    },
    {
        id: "13",
        name: "Computer Desk",
        image: images.table7,
        price: "250.00",
        numReviews: 160,
        rating: 4.5,
        quantity: 4200,
        numSolds: 752,
        categoryId: "3",
        navigate: "tabledetails"
    },
    {
        id: "14",
        name: "Chaise Lounge Sofa",
        image: images.sofa9,
        price: "320.00",
        numReviews: 112,
        rating: 4.8,
        quantity: 4200,
        numSolds: 3240,
        categoryId: "1",
        navigate: "sofadetails"
    },
    {
        id: "15",
        name: "Bean Bag Chair",
        image: images.chair11,
        price: "430.00",
        numReviews: 210,
        rating: 4.7,
        quantity: 4200,
        numSolds: 1092,
        categoryId: "2",
        navigate: "chairdetails"
    },
]

export const baseProducts = [
    {
        id: "1",
        name: "Wooden Vase with Carvings",
        image: images.boilermanualsample1,
        price: "25.00",
        numReviews: 240,
        rating: 4.5,
        quantity: 15000,
        numSolds: 6321,
        categoryId: "11",
        navigate: "vasedetails"
    },
    {
        id: "2",
        name: "Art Nouveau Lamp",
        image: images.boilermanualsample2,
        price: "485.00",
        numReviews: 143,
        rating: 4.5,
        quantity: 1300,
        numSolds: 9373,
        categoryId: "5",
        navigate: "lampdetails"
    },
    {
        id: "3",
        name: "Walk-in Closet",
        image: images.cupboard12,
        price: "90.00",
        numReviews: 430,
        rating: 4.3,
        quantity: 1300,
        numSolds: 426,
        categoryId: "6",
        navigate: "cupboarddetails"
    },
    {
        id: "4",
        name: "Silicia Silver Knife",
        image: images.kitchen1,
        price: "120.00",
        numReviews: 156,
        rating: 4.4,
        quantity: 8500,
        numSolds: 5621,
        categoryId: "4",
        navigate: "kitchendetails"
    },
    {
        id: "5",
        name: "Minimalist Table Lamp",
        image: images.lamp3,
        price: "45.00",
        numReviews: 180,
        rating: 4.3,
        quantity: 10000,
        numSolds: 4236,
        categoryId: "5",
        navigate: "lampdetails"
    },
    {
        id: "6",
        name: "Folding Chair",
        image: images.chair9,
        price: "150.00",
        numReviews: 205,
        rating: 4.8,
        quantity: 300,
        numSolds: 1689,
        categoryId: "2",
        navigate: "chairdetails"
    },
    {
        id: "7",
        name: "Study Desk",
        image: images.table6,
        price: "132.00",
        numReviews: 300,
        rating: 4.9,
        quantity: 8500,
        numSolds: 459,
        categoryId: "3",
        navigate: "tabledetails"
    },
    {
        id: "8",
        name: "Modular Sofa Set",
        image: images.sofa8,
        price: "155.00",
        numReviews: 210,
        rating: 4.9,
        quantity: 60000,
        numSolds: 1200,
        categoryId: "1",
        navigate: "sofadetails"
    },
    {
        id: "9",
        name: "Rocking Chair",
        image: images.chair6,
        price: "165.00",
        numReviews: 120,
        rating: 4.9,
        quantity: 50003,
        numSolds: 1230,
        categoryId: "2",
        navigate: "chairdetails"
    },
    {
        id: "10",
        name: "Glass Coffee Table",
        image: images.table2,
        price: "450.00",
        numReviews: 180,
        rating: 4.8,
        quantity: 35000,
        numSolds: 987,
        categoryId: "3",
        navigate: "tabledetails"
    },
    {
        id: "11",
        name: "Chef's Knife",
        image: images.kitchen4,
        price: "25.00",
        numReviews: 98,
        rating: 4.2,
        quantity: 500,
        numSolds: 562,
        categoryId: "4",
        navigate: "kitchendetails"
    },
    {
        id: "12",
        name: "Adjustable Desk Lamp",
        image: images.lamp8,
        price: "75.00",
        numReviews: 150,
        rating: 4.5,
        quantity: 28000,
        numSolds: 632,
        categoryId: "5",
        navigate: "lampdetails"
    },
    {
        id: "13",
        name: "Computer Desk",
        image: images.table7,
        price: "250.00",
        numReviews: 160,
        rating: 4.5,
        quantity: 4200,
        numSolds: 752,
        categoryId: "3",
        navigate: "tabledetails"
    },
    {
        id: "14",
        name: "Chaise Lounge Sofa",
        image: images.sofa9,
        price: "320.00",
        numReviews: 112,
        rating: 4.8,
        quantity: 4200,
        numSolds: 3240,
        categoryId: "1",
        navigate: "sofadetails"
    },
    {
        id: "15",
        name: "Bean Bag Chair",
        image: images.chair11,
        price: "430.00",
        numReviews: 210,
        rating: 4.7,
        quantity: 4200,
        numSolds: 1092,
        categoryId: "2",
        navigate: "chairdetails"
    },
]

export const myWishlist = [
    {
        id: "1",
        name: "Wooden Vase with Carvings",
        image: images.vase8,
        price: "25.00",
        numReviews: 240,
        rating: 4.5,
        quantity: 15000,
        numSolds: 6321,
        categoryId: "11",
        navigate: "vasedetails"
    },
    {
        id: "2",
        name: "Art Nouveau Lamp",
        image: images.lamp12,
        price: "485.00",
        numReviews: 143,
        rating: 4.5,
        quantity: 1300,
        numSolds: 9373,
        categoryId: "5",
        navigate: "lampdetails"
    },
    {
        id: "3",
        name: "Walk-in Closet",
        image: images.cupboard12,
        price: "90.00",
        numReviews: 430,
        rating: 4.3,
        quantity: 1300,
        numSolds: 426,
        categoryId: "6",
        navigate: "cupboarddetails"
    },
    {
        id: "4",
        name: "Silicia Silver Knife",
        image: images.kitchen1,
        price: "120.00",
        numReviews: 156,
        rating: 4.4,
        quantity: 8500,
        numSolds: 5621,
        categoryId: "4",
        navigate: "kitchendetails"
    },
    {
        id: "5",
        name: "Minimalist Table Lamp",
        image: images.lamp3,
        price: "45.00",
        numReviews: 180,
        rating: 4.3,
        quantity: 10000,
        numSolds: 4236,
        categoryId: "5",
        navigate: "lampdetails"
    },
    {
        id: "6",
        name: "Folding Chair",
        image: images.chair9,
        price: "150.00",
        numReviews: 205,
        rating: 4.8,
        quantity: 300,
        numSolds: 1689,
        categoryId: "2",
        navigate: "chairdetails"
    },
    {
        id: "7",
        name: "Study Desk",
        image: images.table6,
        price: "132.00",
        numReviews: 300,
        rating: 4.9,
        quantity: 8500,
        numSolds: 459,
        categoryId: "3",
        navigate: "tabledetails"
    },
    {
        id: "8",
        name: "Modular Sofa Set",
        image: images.sofa8,
        price: "155.00",
        numReviews: 210,
        rating: 4.9,
        quantity: 60000,
        numSolds: 1200,
        categoryId: "1",
        navigate: "sofadetails"
    },
    {
        id: "9",
        name: "Rocking Chair",
        image: images.chair6,
        price: "165.00",
        numReviews: 120,
        rating: 4.9,
        quantity: 50003,
        numSolds: 1230,
        categoryId: "2",
        navigate: "chairdetails"
    },
    {
        id: "10",
        name: "Glass Coffee Table",
        image: images.table2,
        price: "450.00",
        numReviews: 180,
        rating: 4.8,
        quantity: 35000,
        numSolds: 987,
        categoryId: "3",
        navigate: "tabledetails"
    },
    {
        id: "11",
        name: "Chef's Knife",
        image: images.kitchen4,
        price: "25.00",
        numReviews: 98,
        rating: 4.2,
        quantity: 500,
        numSolds: 562,
        categoryId: "4",
        navigate: "kitchendetails"
    },
    {
        id: "12",
        name: "Adjustable Desk Lamp",
        image: images.lamp8,
        price: "75.00",
        numReviews: 150,
        rating: 4.5,
        quantity: 28000,
        numSolds: 632,
        categoryId: "5",
        navigate: "lampdetails"
    },
    {
        id: "13",
        name: "Computer Desk",
        image: images.table7,
        price: "250.00",
        numReviews: 160,
        rating: 4.5,
        quantity: 4200,
        numSolds: 752,
        categoryId: "3",
        navigate: "tabledetails"
    },
    {
        id: "14",
        name: "Chaise Lounge Sofa",
        image: images.sofa9,
        price: "320.00",
        numReviews: 112,
        rating: 4.8,
        quantity: 4200,
        numSolds: 3240,
        categoryId: "1",
        navigate: "sofadetails"
    },
    {
        id: "15",
        name: "Bean Bag Chair",
        image: images.chair11,
        price: "430.00",
        numReviews: 210,
        rating: 4.7,
        quantity: 4200,
        numSolds: 1092,
        categoryId: "2",
        navigate: "chairdetails"
    },
]

export const ratings = [
    {
        id: "1",
        title: "All"
    },
    {
        id: "6",
        title: "5"
    },
    {
        id: "5",
        title: "4"
    },
    {
        id: "4",
        title: "3"
    },
    {
        id: "3",
        title: "2"
    },
    {
        id: "2",
        title: "1"
    }
];

export const sorts = [
    {
        id: "1",
        name: "Popular"
    },
    {
        id: "2",
        name: "Most Recent"
    },
    {
        id: "3",
        name: "Price High"
    },
    {
        id: "4",
        name: "Price Low"
    },
    {
        id: "5",
        name: "Most Rated"
    },
];

export const productReviews = [
    {
        id: "1",
        avatar: images.user1,
        name: "John Smith",
        description: "This product was simply amazing! The powerful motor and variety of settings made blending effortless. Highly recommended! 😍",
        rating: 4.8,
        avgRating: 5,
        date: "2024-03-28T12:00:00.000Z",
        numLikes: 320
    },
    {
        id: "2",
        avatar: images.user2,
        name: "Emily Davis",
        description: "I thoroughly enjoyed this item. The versatility and ease of use were exceptional. Definitely a staple in my kitchen!",
        rating: 4.7,
        avgRating: 5,
        date: "2024-03-28T12:00:00.000Z",
        numLikes: 95
    },
    {
        id: "3",
        avatar: images.user3,
        name: "Michael Rodriguez",
        description: "This product exceeded my expectations! The build quality and performance were remarkable. Will be recommending it to friends!",
        rating: 4.9,
        avgRating: 5,
        date: "2024-03-29T12:00:00.000Z",
        numLikes: 210
    },
    {
        id: "4",
        avatar: images.user4,
        name: "Sarah Brown",
        description: "I had a wonderful experience with this item. The design and functionality were outstanding, making it a joy to use. Highly recommend!",
        rating: 4.5,
        avgRating: 5,
        date: "2024-03-29T12:00:00.000Z",
        numLikes: 150
    },
    {
        id: "5",
        avatar: images.user5,
        name: "David Wilson",
        description: "Absolutely fantastic! This product exceeded my expectations with its performance and durability. It's a must-have for any kitchen!",
        rating: 3.8,
        avgRating: 4,
        date: "2024-02-31T12:00:00.000Z",
        numLikes: 500
    },
    {
        id: "6",
        avatar: images.user6,
        name: "Luca Dalasias",
        description: "This item exceeded my expectations! The build quality and performance were remarkable. Will be recommending it to friends!",
        rating: 4.8,
        avgRating: 5,
        date: "2024-02-29T12:00:00.000Z",
        numLikes: 210
    },
    {
        id: "7",
        avatar: images.user7,
        name: "Sophia Johnson",
        description: "I'm impressed by this product! The ease of use and durability make it a great addition to my daily routine.",
        rating: 4.6,
        avgRating: 5,
        date: "2024-04-15T12:00:00.000Z",
        numLikes: 180
    },
    {
        id: "8",
        avatar: images.user8,
        name: "Daniel White",
        description: "This item is a game-changer! It simplifies tasks and saves me so much time in the kitchen. Highly recommend it to everyone!",
        rating: 4.9,
        avgRating: 5,
        date: "2024-04-20T12:00:00.000Z",
        numLikes: 250
    },
    {
        id: "9",
        avatar: images.user9,
        name: "Olivia Martinez",
        description: "I'm in love with this product! It's stylish, efficient, and makes cooking a breeze. Definitely worth every penny!",
        rating: 5.0,
        avgRating: 5,
        date: "2024-04-22T12:00:00.000Z",
        numLikes: 380
    },
];

export const myCart = [
    {
        id: "1",
        name: "Ceramic Flower Vase",
        image: images.vase1,
        price: "485.00",
        numReviews: 143,
        rating: 4.5,
        quantity: 1300,
        numSolds: 9373,
        categoryId: "7",
        navigate: "vasedetails",
        color: "#949494",
    },
    {
        id: "2",
        name: "Modern Ceramic Vase",
        image: images.vase7,
        price: "120.00",
        numReviews: 156,
        rating: 4.4,
        quantity: 8500,
        numSolds: 5621,
        categoryId: "7",
        navigate: "vasedetails",
        color: "#101010",
    },
    {
        id: "3",
        name: "Fitted Cupboard",
        image: images.cupboard11,
        price: "90.00",
        numReviews: 430,
        rating: 4.3,
        quantity: 1300,
        numSolds: 426,
        categoryId: "6",
        navigate: "cupboarddetails",
        color: "#7A5548",
        size: null
    },
    {
        id: "4",
        name: "Swing Arm Wall Lamp",
        image: images.lamp9,
        price: "375.00",
        numReviews: 160,
        rating: 4.3,
        quantity: 8500,
        numSolds: 752,
        categoryId: "5",
        navigate: "lampdetails",
        color: "#E7E7E7",
        size: null
    },
    {
        id: "5",
        name: "Study Desk",
        image: images.table6,
        price: "90.00",
        numReviews: 180,
        rating: 4.5,
        quantity: 6000,
        numSolds: 987,
        categoryId: "3",
        navigate: "tabledetails",
        color: "#482173",
        size: null
    },
    {
        id: "6",
        name: "Bedside Table",
        image: images.table10,
        price: "150.00",
        numReviews: 205,
        rating: 4.8,
        quantity: 300,
        numSolds: 1689,
        navigate: "tabledetails",
        color: "#452681",
        categoryId: "3",
        size: null
    },
]

export const orderList = [
    {
        id: "1",
        name: "Ceramic Flower Vase",
        image: images.vase1,
        price: "485.00",
        numReviews: 143,
        rating: 4.5,
        numSolds: 9373,
        categoryId: "7",
        navigate: "vasedetails",
        color: "#949494",
        quantity: 1
    },
    {
        id: "2",
        name: "Modern Ceramic Vase",
        image: images.vase7,
        price: "120.00",
        numReviews: 156,
        rating: 4.4,
        numSolds: 5621,
        categoryId: "7",
        navigate: "vasedetails",
        color: "#101010",
        quantity: 1
    },
    {
        id: "3",
        name: "Fitted Cupboard",
        image: images.cupboard11,
        price: "90.00",
        numReviews: 430,
        rating: 4.3,
        numSolds: 426,
        categoryId: "6",
        navigate: "cupboarddetails",
        color: "#7A5548",
        size: null,
        quantity: 2
    },
    {
        id: "4",
        name: "Swing Arm Wall Lamp",
        image: images.lamp9,
        price: "375.00",
        numReviews: 160,
        rating: 4.3,
        numSolds: 752,
        categoryId: "5",
        navigate: "lampdetails",
        color: "#E7E7E7",
        size: null,
        quantity: 1
    },
    {
        id: "5",
        name: "Study Desk",
        image: images.table6,
        price: "90.00",
        numReviews: 180,
        rating: 4.5,
        numSolds: 987,
        categoryId: "3",
        navigate: "tabledetails",
        color: "#482173",
        size: null,
        quantity: 1
    },
    {
        id: "6",
        name: "Bedside Table",
        image: images.table10,
        price: "150.00",
        numReviews: 205,
        rating: 4.8,
        numSolds: 1689,
        navigate: "tabledetails",
        color: "#452681",
        categoryId: "3",
        size: null,
        quantity: 1
    },
]

export const ongoingOrders = [
    {
        id: "1",
        name: "Ceramic Flower Vase",
        image: images.vase1,
        price: "485.00",
        numReviews: 143,
        rating: 4.5,
        numSolds: 9373,
        categoryId: "7",
        navigate: "vasedetails",
        color: "#949494",
        quantity: 1,
        address: "123 Main St, Cityville",
        status: "Paid",
    },
    {
        id: "2",
        name: "Modern Ceramic Vase",
        image: images.vase7,
        price: "120.00",
        numReviews: 156,
        rating: 4.4,
        numSolds: 5621,
        categoryId: "7",
        navigate: "vasedetails",
        color: "#101010",
        quantity: 1,
        address: "456 Oak St, Townsville",
        status: "Paid",
    },
    {
        id: "3",
        name: "Fitted Cupboard",
        image: images.cupboard11,
        price: "90.00",
        numReviews: 430,
        rating: 4.3,
        numSolds: 426,
        categoryId: "6",
        navigate: "cupboarddetails",
        color: "#7A5548",
        size: null,
        quantity: 2,
        address: "789 Pine St, Villagetown",
        status: "Paid",
    },
    {
        id: "4",
        name: "Swing Arm Wall Lamp",
        image: images.lamp9,
        price: "375.00",
        numReviews: 160,
        rating: 4.3,
        numSolds: 752,
        categoryId: "5",
        navigate: "lampdetails",
        color: "#E7E7E7",
        size: null,
        quantity: 1,
        address: "910 Elm St, Hamlet",
        status: "Paid",
    },
    {
        id: "5",
        name: "Study Desk",
        image: images.table6,
        price: "90.00",
        numReviews: 180,
        rating: 4.5,
        numSolds: 987,
        categoryId: "3",
        navigate: "tabledetails",
        color: "#482173",
        size: null,
        quantity: 1,
        address: "321 Maple St, Suburbia",
        status: "Paid",
    },
    {
        id: "6",
        name: "Bedside Table",
        image: images.table10,
        price: "150.00",
        numReviews: 205,
        rating: 4.8,
        numSolds: 1689,
        navigate: "tabledetails",
        color: "#452681",
        categoryId: "3",
        size: null,
        quantity: 1,
        address: "567 Cedar St, Countryside",
        status: "Paid",
    },
]
export const ongoingJobs = [
    {
        id: "1",
        name: "Sakib Buiyan",
        image: images.vase1,
        price: "485.00",
        numReviews: 143,
        rating: 4.5,
        numSolds: 9373,
        categoryId: "7",
        navigate: "vasedetails",
        color: "#949494",
        quantity: 1,
        address: "123 Main St, Cityville",
        status: "Paid",
    },
    {
        id: "2",
        name: "Modern Ceramic Vase",
        image: images.vase7,
        price: "120.00",
        numReviews: 156,
        rating: 4.4,
        numSolds: 5621,
        categoryId: "7",
        navigate: "vasedetails",
        color: "#101010",
        quantity: 1,
        address: "456 Oak St, Townsville",
        status: "Paid",
    },
    {
        id: "3",
        name: "Fitted Cupboard",
        image: images.cupboard11,
        price: "90.00",
        numReviews: 430,
        rating: 4.3,
        numSolds: 426,
        categoryId: "6",
        navigate: "cupboarddetails",
        color: "#7A5548",
        size: null,
        quantity: 2,
        address: "789 Pine St, Villagetown",
        status: "Paid",
    },
    {
        id: "4",
        name: "Swing Arm Wall Lamp",
        image: images.lamp9,
        price: "375.00",
        numReviews: 160,
        rating: 4.3,
        numSolds: 752,
        categoryId: "5",
        navigate: "lampdetails",
        color: "#E7E7E7",
        size: null,
        quantity: 1,
        address: "910 Elm St, Hamlet",
        status: "Paid",
    },
    {
        id: "5",
        name: "Study Desk",
        image: images.table6,
        price: "90.00",
        numReviews: 180,
        rating: 4.5,
        numSolds: 987,
        categoryId: "3",
        navigate: "tabledetails",
        color: "#482173",
        size: null,
        quantity: 1,
        address: "321 Maple St, Suburbia",
        status: "Paid",
    },
    {
        id: "6",
        name: "Bedside Table",
        image: images.table10,
        price: "150.00",
        numReviews: 205,
        rating: 4.8,
        numSolds: 1689,
        navigate: "tabledetails",
        color: "#452681",
        categoryId: "3",
        size: null,
        quantity: 1,
        address: "567 Cedar St, Countryside",
        status: "Paid",
    },
]

export const completedOrders = [
    {
        id: "1",
        name: "Ceramic Flower Vase",
        image: images.vase1,
        price: "485.00",
        numReviews: 143,
        rating: 4.5,
        numSolds: 9373,
        categoryId: "7",
        navigate: "vasedetails",
        color: "#949494",
        quantity: 1,
        address: "123 Main St, Cityville",
        status: "Paid",
    },
    {
        id: "2",
        name: "Modern Ceramic Vase",
        image: images.vase7,
        price: "120.00",
        numReviews: 156,
        rating: 4.4,
        numSolds: 5621,
        categoryId: "7",
        navigate: "vasedetails",
        color: "#101010",
        quantity: 1,
        address: "456 Oak St, Townsville",
        status: "Paid",
    },
    {
        id: "3",
        name: "Fitted Cupboard",
        image: images.cupboard11,
        price: "90.00",
        numReviews: 430,
        rating: 4.3,
        numSolds: 426,
        categoryId: "6",
        navigate: "cupboarddetails",
        color: "#7A5548",
        size: null,
        quantity: 2,
        address: "789 Pine St, Villagetown",
        status: "Paid",
    },
    {
        id: "4",
        name: "Swing Arm Wall Lamp",
        image: images.lamp9,
        price: "375.00",
        numReviews: 160,
        rating: 4.3,
        numSolds: 752,
        categoryId: "5",
        navigate: "lampdetails",
        color: "#E7E7E7",
        size: null,
        quantity: 1,
        address: "910 Elm St, Hamlet",
        status: "Paid",
    },
    {
        id: "5",
        name: "Study Desk",
        image: images.table6,
        price: "90.00",
        numReviews: 180,
        rating: 4.5,
        numSolds: 987,
        categoryId: "3",
        navigate: "tabledetails",
        color: "#482173",
        size: null,
        quantity: 1,
        address: "321 Maple St, Suburbia",
        status: "Paid",
    },
    {
        id: "6",
        name: "Bedside Table",
        image: images.table10,
        price: "150.00",
        numReviews: 205,
        rating: 4.8,
        numSolds: 1689,
        navigate: "tabledetails",
        color: "#452681",
        categoryId: "3",
        size: null,
        quantity: 1,
        address: "567 Cedar St, Countryside",
        status: "Paid",
    },
]

export const cancelledOrders = [
    {
        id: "1",
        name: "Ceramic Flower Vase",
        image: images.vase1,
        price: "485.00",
        numReviews: 143,
        rating: 4.5,
        numSolds: 9373,
        categoryId: "7",
        navigate: "vasedetails",
        color: "#949494",
        quantity: 1,
        address: "123 Main St, Cityville",
        status: "Refunded"
    },
    {
        id: "2",
        name: "Modern Ceramic Vase",
        image: images.vase7,
        price: "120.00",
        numReviews: 156,
        rating: 4.4,
        numSolds: 5621,
        categoryId: "7",
        navigate: "vasedetails",
        color: "#101010",
        quantity: 1,
        address: "456 Oak St, Townsville",
        status: "Refunded"
    },
    {
        id: "3",
        name: "Fitted Cupboard",
        image: images.cupboard11,
        price: "90.00",
        numReviews: 430,
        rating: 4.3,
        numSolds: 426,
        categoryId: "6",
        navigate: "cupboarddetails",
        color: "#7A5548",
        size: null,
        quantity: 2,
        address: "789 Pine St, Villagetown",
        status: "Refunded"
    },
    {
        id: "4",
        name: "Swing Arm Wall Lamp",
        image: images.lamp9,
        price: "375.00",
        numReviews: 160,
        rating: 4.3,
        numSolds: 752,
        categoryId: "5",
        navigate: "lampdetails",
        color: "#E7E7E7",
        size: null,
        quantity: 1,
        address: "910 Elm St, Hamlet",
        status: "Refunded",
    },
    {
        id: "5",
        name: "Study Desk",
        image: images.table6,
        price: "90.00",
        numReviews: 180,
        rating: 4.5,
        numSolds: 987,
        categoryId: "3",
        navigate: "tabledetails",
        color: "#482173",
        size: null,
        quantity: 1,
        address: "321 Maple St, Suburbia",
        status: "Refunded",
    },
    {
        id: "6",
        name: "Bedside Table",
        image: images.table10,
        price: "150.00",
        numReviews: 205,
        rating: 4.8,
        numSolds: 1689,
        navigate: "tabledetails",
        color: "#452681",
        categoryId: "3",
        size: null,
        quantity: 1,
        address: "567 Cedar St, Countryside",
        status: "Refunded",
    },
]

export const notifications = [
    {
        id: "1",
        icon: icons.chat,
        title: "Product Inquiry from Kathryn",
        description: "Kathryn has sent you a message regarding a product inquiry. Tap to view.",
        date: "2024-01-16T04:52:06.501Z"
    },
    {
        id: "2",
        icon: icons.box,
        title: "Order Confirmation",
        description: "Congratulations! Your order has been successfully placed. Tap for details.",
        date: "2024-01-23T04:52:06.501Z"
    },
    {
        id: "3",
        icon: icons.chat,
        title: "New Product Announcement",
        description: "Exciting news! We have added new products to our collection. Tap to explore.",
        date: "2024-01-23T08:52:06.501Z"
    },
    {
        id: "4",
        icon: icons.discount,
        title: "Exclusive Discount Offer",
        description: "Enjoy a 20% discount on your next purchase! Limited time offer. Tap for details.",
        date: "2024-01-28T08:52:06.501Z"
    },
    {
        id: "5",
        icon: icons.chat,
        title: "New Feature Available",
        description: "Discover our latest feature that enhances your shopping experience. Tap to learn more.",
        date: "2024-01-29T08:52:06.501Z"
    },
    {
        id: "6",
        icon: icons.box,
        title: "Payment Method Linked",
        description: "Your payment method has been successfully linked to your account.",
        date: "2024-01-23T04:52:06.501Z"
    },
    {
        id: "7",
        icon: icons.chat,
        title: "Message from Julia",
        description: "Julia has sent you a message. Tap to read.",
        date: "2024-01-16T04:52:06.501Z"
    },
    {
        id: "8",
        icon: icons.chat,
        title: "Message from Joanna",
        description: "Joanna has sent you a message. Tap to read.",
        date: "2024-01-16T04:52:06.501Z"
    },
    {
        id: "9",
        icon: icons.chat,
        title: "Message from Lilia",
        description: "Lilia has sent you a message. Tap to read.",
        date: "2024-01-16T04:52:06.501Z"
    },
    {
        id: "10",
        icon: icons.box,
        title: "Account Setup Completed",
        description: "Congratulations! Your account setup has been completed successfully.",
        date: "2024-01-28T04:52:06.501Z"
    },
    {
        id: "11",
        icon: icons.discount,
        title: "Exclusive First Purchase Discount",
        description: "Receive a 50% discount on your first purchase! Limited time offer. Tap for details.",
        date: "2024-01-28T08:52:06.501Z"
    },
    {
        id: "12",
        icon: icons.chat,
        title: "Message from Mily",
        description: "Mily has sent you a message. Tap to read.",
        date: "2024-01-31T04:52:06.501Z"
    },
];
