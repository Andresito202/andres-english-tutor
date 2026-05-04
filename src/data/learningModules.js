export const learningModules = [
  {
    levelId: "beginner",
    levelTitle: "Nivel Principiante",
    description: "Aprende lo fundamental para empezar a hablar.",
    modules: [
      {
        moduleId: "greetings",
        title: "Saludos y despedidas",
        description: "Aprende los saludos más comunes en inglés.",
        visualKey: "Sun",
        lessons: [
          { id: "hello", spanish: "Hola", english: "Hello", pronunciation: "jelou", ipa: "/həˈloʊ/", visualKey: "Hand", audioText: "Hello" },
          { id: "good_morning", spanish: "Buenos días", english: "Good morning", pronunciation: "gud mor-ning", ipa: "/gʊd ˈmɔr nɪŋ/", visualKey: "Sun", audioText: "Good morning" },
          { id: "good_afternoon", spanish: "Buenas tardes", english: "Good afternoon", pronunciation: "gud af-ter-nun", ipa: "/gʊd ˌæf tərˈnun/", visualKey: "Sun", audioText: "Good afternoon" },
          { id: "good_evening", spanish: "Buenas noches (llegada)", english: "Good evening", pronunciation: "gud i-vning", ipa: "/gʊd ˈiv nɪŋ/", visualKey: "Moon", audioText: "Good evening" },
          { id: "good_night", spanish: "Buenas noches (despedida)", english: "Good night", pronunciation: "gud nait", ipa: "/gʊd ˈnaɪt/", visualKey: "Moon", audioText: "Good night" },
          { id: "goodbye", spanish: "Adiós", english: "Goodbye", pronunciation: "gud-bai", ipa: "/gʊdˈbaɪ/", visualKey: "Hand", audioText: "Goodbye" },
          { id: "see_you", spanish: "Nos vemos", english: "See you", pronunciation: "si yu", ipa: "/si ju/", visualKey: "Eye", audioText: "See you" },
          { id: "take_care", spanish: "Cuídate", english: "Take care", pronunciation: "teik ker", ipa: "/teɪk kɛər/", visualKey: "Heart", audioText: "Take care" }
        ]
      },
      {
        moduleId: "introductions",
        title: "Presentaciones personales",
        description: "Aprende a presentarte y preguntar cómo están los demás.",
        visualKey: "Users",
        lessons: [
          { id: "how_are_you", spanish: "¿Cómo estás?", english: "How are you?", pronunciation: "jau ar yu", ipa: "/haʊ ɑr ju/", visualKey: "MessageCircle", audioText: "How are you?" },
          { id: "im_fine", spanish: "Estoy bien", english: "I am fine", pronunciation: "ai am fain", ipa: "/aɪ æm faɪn/", visualKey: "Smile", audioText: "I am fine" },
          { id: "my_name_is", spanish: "Mi nombre es...", english: "My name is...", pronunciation: "mai neim is", ipa: "/maɪ neɪm ɪz/", visualKey: "User", audioText: "My name is" },
          { id: "whats_your_name", spanish: "¿Cuál es tu nombre?", english: "What is your name?", pronunciation: "uat is iur neim", ipa: "/wʌt ɪz jʊər neɪm/", visualKey: "HelpCircle", audioText: "What is your name?" },
          { id: "nice_to_meet", spanish: "Mucho gusto", english: "Nice to meet you", pronunciation: "nais tu mit yu", ipa: "/naɪs tu mit ju/", visualKey: "Hand", audioText: "Nice to meet you" },
          { id: "where_from", spanish: "¿De dónde eres?", english: "Where are you from?", pronunciation: "uer ar yu from", ipa: "/wɛər ɑr ju frʌm/", visualKey: "Map", audioText: "Where are you from?" },
          { id: "im_from", spanish: "Soy de...", english: "I am from...", pronunciation: "ai am from", ipa: "/aɪ æm frʌm/", visualKey: "MapPin", audioText: "I am from" },
          { id: "how_old", spanish: "¿Cuántos años tienes?", english: "How old are you?", pronunciation: "jau ould ar yu", ipa: "/haʊ oʊld ɑr ju/", visualKey: "Calendar", audioText: "How old are you?" }
        ]
      },
      {
        moduleId: "numbers",
        title: "Números",
        description: "Los números del 1 al 10 y básicos.",
        visualKey: "Hash",
        lessons: [
          { id: "num_1", spanish: "Uno", english: "One", pronunciation: "uan", ipa: "/wʌn/", visualKey: "Hash", audioText: "One" },
          { id: "num_2", spanish: "Dos", english: "Two", pronunciation: "tu", ipa: "/tu/", visualKey: "Hash", audioText: "Two" },
          { id: "num_3", spanish: "Tres", english: "Three", pronunciation: "zri", ipa: "/θri/", visualKey: "Hash", audioText: "Three" },
          { id: "num_4", spanish: "Cuatro", english: "Four", pronunciation: "for", ipa: "/fɔr/", visualKey: "Hash", audioText: "Four" },
          { id: "num_5", spanish: "Cinco", english: "Five", pronunciation: "faiv", ipa: "/faɪv/", visualKey: "Hash", audioText: "Five" },
          { id: "num_6", spanish: "Seis", english: "Six", pronunciation: "siks", ipa: "/sɪks/", visualKey: "Hash", audioText: "Six" },
          { id: "num_7", spanish: "Siete", english: "Seven", pronunciation: "se-ven", ipa: "/ˈsɛvən/", visualKey: "Hash", audioText: "Seven" },
          { id: "num_8", spanish: "Ocho", english: "Eight", pronunciation: "eit", ipa: "/eɪt/", visualKey: "Hash", audioText: "Eight" },
          { id: "num_9", spanish: "Nueve", english: "Nine", pronunciation: "nain", ipa: "/naɪn/", visualKey: "Hash", audioText: "Nine" },
          { id: "num_10", spanish: "Diez", english: "Ten", pronunciation: "ten", ipa: "/tɛn/", visualKey: "Hash", audioText: "Ten" }
        ]
      },
      {
        moduleId: "colors",
        title: "Colores",
        description: "Aprende los colores básicos.",
        visualKey: "Palette",
        lessons: [
          { id: "col_red", spanish: "Rojo", english: "Red", pronunciation: "red", ipa: "/rɛd/", visualKey: "Circle", audioText: "Red" },
          { id: "col_blue", spanish: "Azul", english: "Blue", pronunciation: "blu", ipa: "/blu/", visualKey: "Circle", audioText: "Blue" },
          { id: "col_yellow", spanish: "Amarillo", english: "Yellow", pronunciation: "ie-lou", ipa: "/ˈjɛloʊ/", visualKey: "Circle", audioText: "Yellow" },
          { id: "col_green", spanish: "Verde", english: "Green", pronunciation: "grin", ipa: "/ɡriːn/", visualKey: "Circle", audioText: "Green" },
          { id: "col_orange", spanish: "Naranja", english: "Orange", pronunciation: "o-ranch", ipa: "/ˈɔːrɪndʒ/", visualKey: "Circle", audioText: "Orange" },
          { id: "col_black", spanish: "Negro", english: "Black", pronunciation: "blak", ipa: "/blæk/", visualKey: "Circle", audioText: "Black" },
          { id: "col_white", spanish: "Blanco", english: "White", pronunciation: "uait", ipa: "/waɪt/", visualKey: "Circle", audioText: "White" },
          { id: "col_purple", spanish: "Morado", english: "Purple", pronunciation: "per-pl", ipa: "/ˈpɜːrpəl/", visualKey: "Circle", audioText: "Purple" }
        ]
      },
      {
        moduleId: "family",
        title: "Familia",
        description: "Miembros de la familia.",
        visualKey: "Home",
        lessons: [
          { id: "fam_mother", spanish: "Madre", english: "Mother", pronunciation: "mo-der", ipa: "/ˈmʌðər/", visualKey: "User", audioText: "Mother" },
          { id: "fam_father", spanish: "Padre", english: "Father", pronunciation: "fa-der", ipa: "/ˈfɑːðər/", visualKey: "User", audioText: "Father" },
          { id: "fam_brother", spanish: "Hermano", english: "Brother", pronunciation: "bro-der", ipa: "/ˈbrʌðər/", visualKey: "User", audioText: "Brother" },
          { id: "fam_sister", spanish: "Hermana", english: "Sister", pronunciation: "sis-ter", ipa: "/ˈsɪstər/", visualKey: "User", audioText: "Sister" },
          { id: "fam_grandfather", spanish: "Abuelo", english: "Grandfather", pronunciation: "gran-fa-der", ipa: "/ˈɡrændˌfɑːðər/", visualKey: "User", audioText: "Grandfather" },
          { id: "fam_grandmother", spanish: "Abuela", english: "Grandmother", pronunciation: "gran-mo-der", ipa: "/ˈɡrændˌmʌðər/", visualKey: "User", audioText: "Grandmother" },
          { id: "fam_uncle", spanish: "Tío", english: "Uncle", pronunciation: "an-kl", ipa: "/ˈʌŋkəl/", visualKey: "User", audioText: "Uncle" },
          { id: "fam_aunt", spanish: "Tía", english: "Aunt", pronunciation: "ant", ipa: "/ænt/", visualKey: "User", audioText: "Aunt" }
        ]
      },
      {
        moduleId: "common_objects",
        title: "Objetos comunes",
        description: "Cosas que ves todos los días.",
        visualKey: "Package",
        lessons: [
          { id: "obj_book", spanish: "Libro", english: "Book", pronunciation: "buk", ipa: "/bʊk/", visualKey: "Book", audioText: "Book" },
          { id: "obj_pen", spanish: "Bolígrafo", english: "Pen", pronunciation: "pen", ipa: "/pɛn/", visualKey: "Pen", audioText: "Pen" },
          { id: "obj_phone", spanish: "Teléfono", english: "Phone", pronunciation: "foun", ipa: "/foʊn/", visualKey: "Phone", audioText: "Phone" },
          { id: "obj_key", spanish: "Llave", english: "Key", pronunciation: "ki", ipa: "/kiː/", visualKey: "Key", audioText: "Key" },
          { id: "obj_table", spanish: "Mesa", english: "Table", pronunciation: "tei-bl", ipa: "/ˈteɪbəl/", visualKey: "Table", audioText: "Table" },
          { id: "obj_chair", spanish: "Silla", english: "Chair", pronunciation: "cher", ipa: "/tʃɛər/", visualKey: "Chair", audioText: "Chair" },
          { id: "obj_computer", spanish: "Computadora", english: "Computer", pronunciation: "com-piu-ter", ipa: "/kəmˈpjuːtər/", visualKey: "Laptop", audioText: "Computer" },
          { id: "obj_bag", spanish: "Bolsa / Mochila", english: "Bag", pronunciation: "bag", ipa: "/bæɡ/", visualKey: "ShoppingBag", audioText: "Bag" }
        ]
      },
      {
        moduleId: "food_drinks",
        title: "Comida y bebidas",
        description: "Vocabulario básico para comer y beber.",
        visualKey: "Utensils",
        lessons: [
          { id: "fd_water", spanish: "Agua", english: "Water", pronunciation: "ua-ter", ipa: "/ˈwɔːtər/", visualKey: "Droplets", audioText: "Water" },
          { id: "fd_coffee", spanish: "Café", english: "Coffee", pronunciation: "co-fi", ipa: "/ˈkɔːfi/", visualKey: "Coffee", audioText: "Coffee" },
          { id: "fd_bread", spanish: "Pan", english: "Bread", pronunciation: "bred", ipa: "/brɛd/", visualKey: "Croissant", audioText: "Bread" },
          { id: "fd_milk", spanish: "Leche", english: "Milk", pronunciation: "milk", ipa: "/mɪlk/", visualKey: "GlassWater", audioText: "Milk" },
          { id: "fd_apple", spanish: "Manzana", english: "Apple", pronunciation: "a-pl", ipa: "/ˈæpəl/", visualKey: "Apple", audioText: "Apple" },
          { id: "fd_sugar", spanish: "Azúcar", english: "Sugar", pronunciation: "shu-gar", ipa: "/ˈʃʊɡər/", visualKey: "Cigarette", audioText: "Sugar" },
          { id: "fd_salt", spanish: "Sal", english: "Salt", pronunciation: "solt", ipa: "/sɔːlt/", visualKey: "Cigarette", audioText: "Salt" },
          { id: "fd_food", spanish: "Comida", english: "Food", pronunciation: "fud", ipa: "/fuːd/", visualKey: "Utensils", audioText: "Food" }
        ]
      },
      {
        moduleId: "courtesy_phrases",
        title: "Frases de cortesía",
        description: "Palabras mágicas para sonar educado.",
        visualKey: "Heart",
        lessons: [
          { id: "crt_please", spanish: "Por favor", english: "Please", pronunciation: "pliz", ipa: "/pliːz/", visualKey: "Star", audioText: "Please" },
          { id: "crt_thanks", spanish: "Gracias", english: "Thank you", pronunciation: "zank iu", ipa: "/θæŋk juː/", visualKey: "Heart", audioText: "Thank you" },
          { id: "crt_welcome", spanish: "De nada", english: "You're welcome", pronunciation: "iur uel-com", ipa: "/jʊər ˈwɛlkəm/", visualKey: "Smile", audioText: "You're welcome" },
          { id: "crt_sorry", spanish: "Lo siento", english: "I am sorry", pronunciation: "ai am so-ri", ipa: "/aɪ æm ˈsɔːri/", visualKey: "AlertCircle", audioText: "I am sorry" },
          { id: "crt_excuse", spanish: "Disculpe", english: "Excuse me", pronunciation: "eks-kius mi", ipa: "/ɪkˈskjuːz mi/", visualKey: "MessageSquare", audioText: "Excuse me" },
          { id: "crt_problem", spanish: "No hay problema", english: "No problem", pronunciation: "nou pro-blem", ipa: "/noʊ ˈprɒbləm/", visualKey: "CheckCircle", audioText: "No problem" },
          { id: "crt_pardon", spanish: "¿Perdón?", english: "Pardon?", pronunciation: "par-don", ipa: "/ˈpɑːrdən/", visualKey: "HelpCircle", audioText: "Pardon?" },
          { id: "crt_bless", spanish: "Salud (estornudo)", english: "Bless you", pronunciation: "bles iu", ipa: "/blɛs juː/", visualKey: "Wind", audioText: "Bless you" }
        ]
      }
    ]
  },
  {
    levelId: "basic",
    levelTitle: "Nivel Básico",
    description: "Verbos, rutina diaria y oraciones simples.",
    modules: [
      {
        moduleId: "basic_verbs",
        title: "Verbos básicos",
        description: "Acciones de todos los días.",
        visualKey: "Activity",
        lessons: [
          { id: "verb_eat", spanish: "Comer", english: "Eat", pronunciation: "it", ipa: "/iːt/", visualKey: "Utensils", audioText: "Eat" },
          { id: "verb_drink", spanish: "Beber", english: "Drink", pronunciation: "drink", ipa: "/drɪŋk/", visualKey: "Coffee", audioText: "Drink" },
          { id: "verb_sleep", spanish: "Dormir", english: "Sleep", pronunciation: "slip", ipa: "/sliːp/", visualKey: "Moon", audioText: "Sleep" },
          { id: "verb_go", spanish: "Ir", english: "Go", pronunciation: "gou", ipa: "/ɡoʊ/", visualKey: "ArrowRight", audioText: "Go" },
          { id: "verb_want", spanish: "Querer", english: "Want", pronunciation: "uant", ipa: "/wɒnt/", visualKey: "Heart", audioText: "Want" },
          { id: "verb_have", spanish: "Tener", english: "Have", pronunciation: "jav", ipa: "/hæv/", visualKey: "Briefcase", audioText: "Have" },
          { id: "verb_do", spanish: "Hacer", english: "Do", pronunciation: "du", ipa: "/duː/", visualKey: "CheckCircle", audioText: "Do" },
          { id: "verb_say", spanish: "Decir", english: "Say", pronunciation: "sei", ipa: "/seɪ/", visualKey: "MessageCircle", audioText: "Say" }
        ]
      },
      {
        moduleId: "time",
        title: "La Hora",
        description: "Aprende a decir y preguntar la hora.",
        visualKey: "Clock",
        lessons: [
          { id: "time_what", spanish: "¿Qué hora es?", english: "What time is it?", pronunciation: "uat taim is it", ipa: "/wʌt taɪm ɪz ɪt/", visualKey: "HelpCircle", audioText: "What time is it?" },
          { id: "time_oclock", spanish: "En punto", english: "O'clock", pronunciation: "o-clok", ipa: "/əˈklɒk/", visualKey: "Clock", audioText: "O'clock" },
          { id: "time_half", spanish: "Y media", english: "Half past", pronunciation: "jaf past", ipa: "/hɑːf pɑːst/", visualKey: "Clock", audioText: "Half past" },
          { id: "time_quarter", spanish: "Y cuarto", english: "Quarter past", pronunciation: "cuor-ter past", ipa: "/ˈkwɔːrtər pɑːst/", visualKey: "Clock", audioText: "Quarter past" },
          { id: "time_morning", spanish: "Por la mañana", english: "In the morning", pronunciation: "in de mor-ning", ipa: "/ɪn ðə ˈmɔːrnɪŋ/", visualKey: "Sun", audioText: "In the morning" },
          { id: "time_afternoon", spanish: "Por la tarde", english: "In the afternoon", pronunciation: "in de af-ter-nun", ipa: "/ɪn ðə ˌæftərˈnuːn/", visualKey: "Sun", audioText: "In the afternoon" },
          { id: "time_evening", spanish: "Por la noche", english: "In the evening", pronunciation: "in de i-vning", ipa: "/ɪn ðə ˈiːvnɪŋ/", visualKey: "Moon", audioText: "In the evening" },
          { id: "time_midnight", spanish: "Medianoche", english: "Midnight", pronunciation: "mid-nait", ipa: "/ˈmɪdnaɪt/", visualKey: "Moon", audioText: "Midnight" }
        ]
      },
      {
        moduleId: "days_months",
        title: "Días y Meses",
        description: "Calendario y organización del tiempo.",
        visualKey: "Calendar",
        lessons: [
          { id: "day_mon", spanish: "Lunes", english: "Monday", pronunciation: "man-dei", ipa: "/ˈmʌndeɪ/", visualKey: "Calendar", audioText: "Monday" },
          { id: "day_tue", spanish: "Martes", english: "Tuesday", pronunciation: "tius-dei", ipa: "/ˈtjuːzdeɪ/", visualKey: "Calendar", audioText: "Tuesday" },
          { id: "day_wed", spanish: "Miércoles", english: "Wednesday", pronunciation: "uens-dei", ipa: "/ˈwɛnzdeɪ/", visualKey: "Calendar", audioText: "Wednesday" },
          { id: "day_thu", spanish: "Jueves", english: "Thursday", pronunciation: "zers-dei", ipa: "/ˈθɜːrzdeɪ/", visualKey: "Calendar", audioText: "Thursday" },
          { id: "day_fri", spanish: "Viernes", english: "Friday", pronunciation: "frai-dei", ipa: "/ˈfraɪdeɪ/", visualKey: "Calendar", audioText: "Friday" },
          { id: "day_sat", spanish: "Sábado", english: "Saturday", pronunciation: "sa-ter-dei", ipa: "/ˈsætərdeɪ/", visualKey: "Calendar", audioText: "Saturday" },
          { id: "day_sun", spanish: "Domingo", english: "Sunday", pronunciation: "san-dei", ipa: "/ˈsʌndeɪ/", visualKey: "Calendar", audioText: "Sunday" },
          { id: "month_jan", spanish: "Enero", english: "January", pronunciation: "yan-iu-e-ri", ipa: "/ˈdʒænjuɛri/", visualKey: "Calendar", audioText: "January" }
        ]
      },
      {
        moduleId: "daily_routine",
        title: "Rutina diaria",
        description: "Expresa lo que haces cada día.",
        visualKey: "Sun",
        lessons: [
          { id: "rt_wake", spanish: "Despertarse", english: "Wake up", pronunciation: "ueik ap", ipa: "/ueɪk ʌp/", visualKey: "Sun", audioText: "Wake up" },
          { id: "rt_shower", spanish: "Ducharse", english: "Take a shower", pronunciation: "teik a shau-er", ipa: "/teɪk ə ˈʃaʊər/", visualKey: "Wind", audioText: "Take a shower" },
          { id: "rt_breakfast", spanish: "Desayunar", english: "Eat breakfast", pronunciation: "it brek-fast", ipa: "/iːt ˈbrɛkfəst/", visualKey: "Coffee", audioText: "Eat breakfast" },
          { id: "rt_work", spanish: "Ir al trabajo", english: "Go to work", pronunciation: "gou tu uerk", ipa: "/ɡoʊ tuː wɜːrk/", visualKey: "Briefcase", audioText: "Go to work" },
          { id: "rt_lunch", spanish: "Almorzar", english: "Eat lunch", pronunciation: "it lanch", ipa: "/iːt lʌntʃ/", visualKey: "Utensils", audioText: "Eat lunch" },
          { id: "rt_home", spanish: "Regresar a casa", english: "Go home", pronunciation: "gou jom", ipa: "/ɡoʊ hoʊm/", visualKey: "Home", audioText: "Go home" },
          { id: "rt_dinner", spanish: "Cenar", english: "Eat dinner", pronunciation: "it di-ner", ipa: "/iːt ˈdɪnər/", visualKey: "Utensils", audioText: "Eat dinner" },
          { id: "rt_sleep", spanish: "Ir a dormir", english: "Go to sleep", pronunciation: "gou tu slip", ipa: "/ɡoʊ tuː sliːp/", visualKey: "Moon", audioText: "Go to sleep" }
        ]
      },
      {
        moduleId: "city_places",
        title: "Lugares de la ciudad",
        description: "¿A dónde vas hoy?",
        visualKey: "MapPin",
        lessons: [
          { id: "pl_supermarket", spanish: "Supermercado", english: "Supermarket", pronunciation: "su-per-mar-ket", ipa: "/ˈsuːpərmɑːrkɪt/", visualKey: "ShoppingBag", audioText: "Supermarket" },
          { id: "pl_hospital", spanish: "Hospital", english: "Hospital", pronunciation: "jos-pi-tal", ipa: "/ˈhɒspɪtl/", visualKey: "Heart", audioText: "Hospital" },
          { id: "pl_park", spanish: "Parque", english: "Park", pronunciation: "park", ipa: "/pɑːrk/", visualKey: "TreePine", audioText: "Park" },
          { id: "pl_restaurant", spanish: "Restaurante", english: "Restaurant", pronunciation: "res-tau-rant", ipa: "/ˈrɛstərənt/", visualKey: "Utensils", audioText: "Restaurant" },
          { id: "pl_school", spanish: "Escuela", english: "School", pronunciation: "skul", ipa: "/skuːl/", visualKey: "GraduationCap", audioText: "School" },
          { id: "pl_bank", spanish: "Banco", english: "Bank", pronunciation: "bank", ipa: "/bæŋk/", visualKey: "Wallet", audioText: "Bank" },
          { id: "pl_pharmacy", spanish: "Farmacia", english: "Pharmacy", pronunciation: "far-ma-si", ipa: "/ˈfɑːrməsi/", visualKey: "ShieldCheck", audioText: "Pharmacy" },
          { id: "pl_street", spanish: "Calle", english: "Street", pronunciation: "strit", ipa: "/striːt/", visualKey: "Map", audioText: "Street" }
        ]
      },
      {
        moduleId: "basic_questions",
        title: "Preguntas básicas",
        description: "Las 5 W del inglés.",
        visualKey: "HelpCircle",
        lessons: [
          { id: "q_what", spanish: "¿Qué?", english: "What?", pronunciation: "uat", ipa: "/wɒt/", visualKey: "HelpCircle", audioText: "What?" },
          { id: "q_where", spanish: "¿Dónde?", english: "Where?", pronunciation: "uer", ipa: "/wɛər/", visualKey: "HelpCircle", audioText: "Where?" },
          { id: "q_when", spanish: "¿Cuándo?", english: "When?", pronunciation: "uen", ipa: "/wɛn/", visualKey: "HelpCircle", audioText: "When?" },
          { id: "q_who", spanish: "¿Quién?", english: "Who?", pronunciation: "ju", ipa: "/huː/", visualKey: "HelpCircle", audioText: "Who?" },
          { id: "q_why", spanish: "¿Por qué?", english: "Why?", pronunciation: "uai", ipa: "/waɪ/", visualKey: "HelpCircle", audioText: "Why?" },
          { id: "q_how", spanish: "¿Cómo?", english: "How?", pronunciation: "jau", ipa: "/haʊ/", visualKey: "HelpCircle", audioText: "How?" },
          { id: "q_how_much", spanish: "¿Cuánto cuesta?", english: "How much is it?", pronunciation: "jau mach is it", ipa: "/haʊ mʌtʃ ɪz ɪt/", visualKey: "Wallet", audioText: "How much is it?" },
          { id: "q_help", spanish: "¿Puedes ayudarme?", english: "Can you help me?", pronunciation: "can iu jelp mi", ipa: "/kæn juː hɛlp miː/", visualKey: "Heart", audioText: "Can you help me?" }
        ]
      },
      {
        moduleId: "shopping_prices",
        title: "Compras y precios",
        description: "Vocabulario para ir de compras.",
        visualKey: "ShoppingCart",
        lessons: [
          { id: "sh_buy", spanish: "Comprar", english: "Buy", pronunciation: "bai", ipa: "/baɪ/", visualKey: "ShoppingCart", audioText: "Buy" },
          { id: "sh_sell", spanish: "Vender", english: "Sell", pronunciation: "sel", ipa: "/sɛl/", visualKey: "Tag", audioText: "Sell" },
          { id: "sh_expensive", spanish: "Caro", english: "Expensive", pronunciation: "eks-pen-siv", ipa: "/ɪkˈspɛnsɪv/", visualKey: "AlertTriangle", audioText: "Expensive" },
          { id: "sh_cheap", spanish: "Barato", english: "Cheap", pronunciation: "chip", ipa: "/tʃiːp/", visualKey: "CheckCircle", audioText: "Cheap" },
          { id: "sh_money", spanish: "Dinero", english: "Money", pronunciation: "ma-ni", ipa: "/ˈmʌni/", visualKey: "Wallet", audioText: "Money" },
          { id: "sh_cash", spanish: "Efectivo", english: "Cash", pronunciation: "cash", ipa: "/kæʃ/", visualKey: "Coins", audioText: "Cash" },
          { id: "sh_credit_card", spanish: "Tarjeta de crédito", english: "Credit card", pronunciation: "cre-dit card", ipa: "/ˈkrɛdɪt kɑːrd/", visualKey: "CreditCard", audioText: "Credit card" },
          { id: "sh_receipt", spanish: "Recibo / Factura", english: "Receipt", pronunciation: "ri-sit", ipa: "/rɪˈsiːt/", visualKey: "FileText", audioText: "Receipt" }
        ]
      },
      {
        moduleId: "simple_descriptions",
        title: "Descripciones simples",
        description: "Adjetivos básicos para personas y cosas.",
        visualKey: "Eye",
        lessons: [
          { id: "desc_big", spanish: "Grande", english: "Big", pronunciation: "big", ipa: "/bɪɡ/", visualKey: "Maximize", audioText: "Big" },
          { id: "desc_small", spanish: "Pequeño", english: "Small", pronunciation: "smol", ipa: "/smɔːl/", visualKey: "Minimize", audioText: "Small" },
          { id: "desc_hot", spanish: "Caliente", english: "Hot", pronunciation: "jot", ipa: "/hɒt/", visualKey: "Flame", audioText: "Hot" },
          { id: "desc_cold", spanish: "Frío", english: "Cold", pronunciation: "could", ipa: "/koʊld/", visualKey: "Snowflake", audioText: "Cold" },
          { id: "desc_happy", spanish: "Feliz", english: "Happy", pronunciation: "ja-pi", ipa: "/ˈhæpi/", visualKey: "Smile", audioText: "Happy" },
          { id: "desc_sad", spanish: "Triste", english: "Sad", pronunciation: "sad", ipa: "/sæd/", visualKey: "Frown", audioText: "Sad" },
          { id: "desc_beautiful", spanish: "Hermoso", english: "Beautiful", pronunciation: "biu-ti-ful", ipa: "/ˈbjuːtɪfəl/", visualKey: "Heart", audioText: "Beautiful" },
          { id: "desc_ugly", spanish: "Feo", english: "Ugly", pronunciation: "ag-li", ipa: "/ˈʌɡli/", visualKey: "AlertCircle", audioText: "Ugly" }
        ]
      }
    ]
  },
  {
    levelId: "intermediate",
    levelTitle: "Nivel Intermedio",
    description: "Conversaciones, trabajo y viajes. (v2.0)",
    modules: [
      {
        moduleId: "social_conversations",
        title: "Conversaciones cotidianas",
        description: "Mejora tu fluidez al socializar.",
        visualKey: "MessageSquare",
        lessons: [
          { id: "soc_weather", spanish: "¿Qué tal el clima?", english: "How is the weather?", pronunciation: "jau is de ue-der", ipa: "/haʊ ɪz ðə ˈwɛðər/", visualKey: "Cloud", audioText: "How is the weather?" },
          { id: "soc_weekend", spanish: "¿Qué hiciste el fin de semana?", english: "What did you do on the weekend?", pronunciation: "uat did iu du on de ui-kend", ipa: "/wɒt dɪd juː duː ɒn ðə ˌwiːkˈɛnd/", visualKey: "Calendar", audioText: "What did you do on the weekend?" },
          { id: "soc_hobbies", spanish: "¿Cuáles son tus pasatiempos?", english: "What are your hobbies?", pronunciation: "uat ar iur jo-bis", ipa: "/wɒt ɑːr jʊər ˈhɒbiz/", visualKey: "Gamepad", audioText: "What are your hobbies?" },
          { id: "soc_busy", spanish: "He estado muy ocupado", english: "I have been very busy", pronunciation: "ai jav bin ve-ri bi-si", ipa: "/aɪ hæv biːn ˈvɛri ˈbɪzi/", visualKey: "Clock", audioText: "I have been very busy" },
          { id: "soc_agree", spanish: "Estoy de acuerdo", english: "I agree with you", pronunciation: "ai a-gri uid iu", ipa: "/aɪ əˈɡriː wɪð juː/", visualKey: "CheckCircle", audioText: "I agree with you" },
          { id: "soc_disagree", spanish: "No estoy de acuerdo", english: "I disagree", pronunciation: "ai dis-a-gri", ipa: "/aɪ ˌdɪsəˈɡriː/", visualKey: "XCircle", audioText: "I disagree" },
          { id: "soc_mean", spanish: "¿Qué quieres decir con eso?", english: "What do you mean by that?", pronunciation: "uat du iu min bai dat", ipa: "/wɒt duː juː miːn baɪ ðæt/", visualKey: "HelpCircle", audioText: "What do you mean by that?" },
          { id: "soc_recommend", spanish: "¿Puedes recomendarme algo?", english: "Can you recommend something?", pronunciation: "can iu re-co-mend som-zing", ipa: "/kæn juː ˌrɛkəˈmɛnd ˈsʌmθɪŋ/", visualKey: "Star", audioText: "Can you recommend something?" }
        ]
      },
      {
        moduleId: "work_office",
        title: "Trabajo y oficina",
        description: "Vocabulario profesional para tu carrera.",
        visualKey: "Briefcase",
        lessons: [
          { id: "wr_meeting", spanish: "Tener una reunión", english: "Have a meeting", pronunciation: "jav a mi-ting", ipa: "/hæv ə ˈmiːtɪŋ/", visualKey: "Users", audioText: "Have a meeting" },
          { id: "wr_deadline", spanish: "Fecha límite", english: "Deadline", pronunciation: "ded-lain", ipa: "/ˈdɛdlaɪn/", visualKey: "Clock", audioText: "Deadline" },
          { id: "wr_colleague", spanish: "Colega / Compañero", english: "Colleague", pronunciation: "co-lig", ipa: "/ˈkɒliːɡ/", visualKey: "User", audioText: "Colleague" },
          { id: "wr_boss", spanish: "Jefe", english: "Boss", pronunciation: "bos", ipa: "/bɒs/", visualKey: "UserCheck", audioText: "Boss" },
          { id: "wr_salary", spanish: "Salario", english: "Salary", pronunciation: "sa-la-ri", ipa: "/ˈsæləri/", visualKey: "Wallet", audioText: "Salary" },
          { id: "wr_promote", spanish: "Ser ascendido", english: "Get promoted", pronunciation: "get pro-mo-ted", ipa: "/ɡɛt prəˈmoʊtɪd/", visualKey: "ArrowUp", audioText: "Get promoted" },
          { id: "wr_resign", spanish: "Renunciar", english: "Resign", pronunciation: "ri-sain", ipa: "/rɪˈzaɪn/", visualKey: "LogOut", audioText: "Resign" },
          { id: "wr_apply", spanish: "Postular a un trabajo", english: "Apply for a job", pronunciation: "a-plai for a yob", ipa: "/əˈplaɪ fɔːr ə dʒɒb/", visualKey: "FileText", audioText: "Apply for a job" }
        ]
      },
      {
        moduleId: "travel_directions",
        title: "Viajes y direcciones",
        description: "Prepárate para tu próximo destino.",
        visualKey: "Plane",
        lessons: [
          { id: "tr_airport", spanish: "Aeropuerto", english: "Airport", pronunciation: "er-port", ipa: "/ˈɛərpɔːrt/", visualKey: "Plane", audioText: "Airport" },
          { id: "tr_ticket", spanish: "Boleto / Pasaje", english: "Ticket", pronunciation: "ti-ket", ipa: "/ˈtɪkɪt/", visualKey: "Ticket", audioText: "Ticket" },
          { id: "tr_passport", spanish: "Pasaporte", english: "Passport", pronunciation: "pas-port", ipa: "/ˈpæspɔːrt/", visualKey: "File", audioText: "Passport" },
          { id: "tr_lost", spanish: "Estoy perdido", english: "I am lost", pronunciation: "ai am lost", ipa: "/aɪ æm lɒst/", visualKey: "Map", audioText: "I am lost" },
          { id: "tr_left", spanish: "Gira a la izquierda", english: "Turn left", pronunciation: "tern left", ipa: "/tɜːrn lɛft/", visualKey: "ArrowLeft", audioText: "Turn left" },
          { id: "tr_right", spanish: "Gira a la derecha", english: "Turn right", pronunciation: "tern rait", ipa: "/tɜːrn raɪt/", visualKey: "ArrowRight", audioText: "Turn right" },
          { id: "tr_straight", spanish: "Sigue recto", english: "Go straight", pronunciation: "gou streit", ipa: "/ɡoʊ streɪt/", visualKey: "ArrowUp", audioText: "Go straight" },
          { id: "tr_hotel", spanish: "Reservar un hotel", english: "Book a hotel", pronunciation: "buk a jo-tel", ipa: "/bʊk ə hoʊˈtɛl/", visualKey: "Home", audioText: "Book a hotel" }
        ]
      },
      {
        moduleId: "restaurant_ordering",
        title: "Restaurante y pedidos",
        description: "Pide tu comida favorita con confianza.",
        visualKey: "Utensils",
        lessons: [
          { id: "res_menu", spanish: "La carta / Menú", english: "The menu", pronunciation: "de me-niu", ipa: "/ðə ˈmɛnjuː/", visualKey: "FileText", audioText: "The menu" },
          { id: "res_order", spanish: "Me gustaría pedir...", english: "I would like to order...", pronunciation: "ai uuld laik tu or-der", ipa: "/aɪ wʊd laɪk tuː ˈɔːrdər/", visualKey: "ShoppingBag", audioText: "I would like to order" },
          { id: "res_water", spanish: "Un vaso de agua", english: "A glass of water", pronunciation: "a glas of ua-ter", ipa: "/ə ɡlɑːs əv ˈwɔːtər/", visualKey: "Droplets", audioText: "A glass of water" },
          { id: "res_check", spanish: "La cuenta, por favor", english: "The check, please", pronunciation: "de chek pliz", ipa: "/ðə tʃɛk pliːz/", visualKey: "Receipt", audioText: "The check, please" },
          { id: "res_delicious", spanish: "Está delicioso", english: "It is delicious", pronunciation: "it is de-li-shous", ipa: "/ɪt ɪz dɪˈlɪʃəs/", visualKey: "Smile", audioText: "It is delicious" },
          { id: "res_allergy", spanish: "Tengo una alergia", english: "I have an allergy", pronunciation: "ai jav an a-ler-yi", ipa: "/aɪ hæv ən ˈælərdʒi/", visualKey: "AlertTriangle", audioText: "I have an allergy" },
          { id: "res_vegetarian", spanish: "¿Es vegetariano?", english: "Is it vegetarian?", pronunciation: "is it ve-ye-te-rian", ipa: "/ɪz ɪt ˌvɛdʒəˈtɛəriən/", visualKey: "Leaf", audioText: "Is it vegetarian?" },
          { id: "res_table_for", spanish: "Una mesa para dos", english: "A table for two", pronunciation: "a tei-bl for tu", ipa: "/ə ˈteɪbəl fɔːr tuː/", visualKey: "Users", audioText: "A table for two" }
        ]
      },
      {
        moduleId: "health_symptoms",
        title: "Salud y síntomas",
        description: "Explica cómo te sientes al doctor.",
        visualKey: "HeartPulse",
        lessons: [
          { id: "he_sick", spanish: "Me siento enfermo", english: "I feel sick", pronunciation: "ai fil sik", ipa: "/aɪ fiːl sɪk/", visualKey: "Frown", audioText: "I feel sick" },
          { id: "he_headache", spanish: "Dolor de cabeza", english: "Headache", pronunciation: "je-deik", ipa: "/ˈhɛdeɪk/", visualKey: "Activity", audioText: "Headache" },
          { id: "he_cold", spanish: "Tengo un resfriado", english: "I have a cold", pronunciation: "ai jav a could", ipa: "/aɪ hæv ə koʊld/", visualKey: "Thermometer", audioText: "I have a cold" },
          { id: "he_doctor", spanish: "Necesito un doctor", english: "I need a doctor", pronunciation: "ai nid a doc-tor", ipa: "/aɪ niːd ə ˈdɒktər/", visualKey: "UserPlus", audioText: "I need a doctor" },
          { id: "he_medicine", spanish: "Tomar medicina", english: "Take medicine", pronunciation: "teik me-di-sin", ipa: "/teɪk ˈmɛdsən/", visualKey: "Pill", audioText: "Take medicine" },
          { id: "he_emergency", spanish: "Esto es una emergencia", english: "This is an emergency", pronunciation: "dis is an e-mer-yen-si", ipa: "/ðɪs ɪz ən ɪˈmɜːrdʒənsi/", visualKey: "AlertCircle", audioText: "This is an emergency" },
          { id: "he_blood", spanish: "Presión arterial", english: "Blood pressure", pronunciation: "blad pre-shur", ipa: "/blʌd ˈprɛʃər/", visualKey: "Activity", audioText: "Blood pressure" },
          { id: "he_better", spanish: "Me siento mejor", english: "I feel better", pronunciation: "ai fil be-ter", ipa: "/aɪ fiːl ˈbɛtər/", visualKey: "Smile", audioText: "I feel better" }
        ]
      },
      {
        moduleId: "preferences_opinions",
        title: "Preferencias y opiniones",
        description: "Comparte lo que te gusta y lo que piensas.",
        visualKey: "ThumbsUp",
        lessons: [
          { id: "pref_like", spanish: "Me gusta mucho", english: "I really like it", pronunciation: "ai ri-li laik it", ipa: "/aɪ ˈrɪəli laɪk ɪt/", visualKey: "Heart", audioText: "I really like it" },
          { id: "pref_hate", spanish: "Lo odio / No me gusta nada", english: "I hate it", pronunciation: "ai jeit it", ipa: "/aɪ heɪt ɪt/", visualKey: "ThumbsDown", audioText: "I hate it" },
          { id: "pref_prefer", spanish: "Prefiero el café", english: "I prefer coffee", pronunciation: "ai pri-fer co-fi", ipa: "/aɪ prɪˈfɜːr ˈkɔːfi/", visualKey: "Coffee", audioText: "I prefer coffee" },
          { id: "pref_opinion", spanish: "En mi opinión", english: "In my opinion", pronunciation: "in mai o-pi-nion", ipa: "/ɪn maɪ əˈpɪnjən/", visualKey: "MessageSquare", audioText: "In my opinion" },
          { id: "pref_think", spanish: "Creo que...", english: "I think that...", pronunciation: "ai zink dat", ipa: "/aɪ θɪŋk ðæt/", visualKey: "Brain", audioText: "I think that" },
          { id: "pref_favorite", spanish: "Mi favorito es...", english: "My favorite is...", pronunciation: "mai fei-vo-rit is", ipa: "/maɪ ˈfeɪvərɪt ɪz/", visualKey: "Star", audioText: "My favorite is" },
          { id: "pref_mind", spanish: "No me importa", english: "I don't mind", pronunciation: "ai dont maind", ipa: "/aɪ doʊnt maɪnd/", visualKey: "CheckCircle", audioText: "I don't mind" },
          { id: "pref_choice", spanish: "Es tu elección", english: "It is your choice", pronunciation: "it is iur chois", ipa: "/ɪt ɪz jʊər tʃɔɪs/", visualKey: "Target", audioText: "It is your choice" }
        ]
      },
      {
        moduleId: "past_tense_simple",
        title: "Pasado simple",
        description: "Cuenta historias sobre lo que ya pasó.",
        visualKey: "History",
        lessons: [
          { id: "pst_yesterday", spanish: "Ayer fui a...", english: "Yesterday I went to...", pronunciation: "ies-ter-dei ai uent tu", ipa: "/ˈjɛstərdeɪ aɪ wɛnt tuː/", visualKey: "ArrowLeft", audioText: "Yesterday I went to" },
          { id: "pst_saw", spanish: "Vi una película", english: "I saw a movie", pronunciation: "ai so a mu-vi", ipa: "/aɪ sɔː ə ˈmuːvi/", visualKey: "Film", audioText: "I saw a movie" },
          { id: "pst_bought", spanish: "Compré algo", english: "I bought something", pronunciation: "ai bot som-zing", ipa: "/aɪ bɔːt ˈsʌmθɪŋ/", visualKey: "ShoppingCart", audioText: "I bought something" },
          { id: "pst_met", spanish: "Conocí a alguien", english: "I met someone", pronunciation: "ai met som-uan", ipa: "/aɪ mɛt ˈsʌmwʌn/", visualKey: "UserPlus", audioText: "I met someone" },
          { id: "pst_was", spanish: "Fue divertido", english: "It was fun", pronunciation: "it uas fan", ipa: "/ɪt wɒz fʌn/", visualKey: "Smile", audioText: "It was fun" },
          { id: "pst_worked", spanish: "Trabajé mucho", english: "I worked a lot", pronunciation: "ai uerkt a lot", ipa: "/aɪ wɜːrkt ə lɒt/", visualKey: "Briefcase", audioText: "I worked a lot" },
          { id: "pst_learned", spanish: "Aprendí inglés", english: "I learned English", pronunciation: "ai lernd in-glish", ipa: "/aɪ lɜːrnd ˈɪŋɡlɪʃ/", visualKey: "GraduationCap", audioText: "I learned English" },
          { id: "pst_happened", spanish: "¿Qué pasó?", english: "What happened?", pronunciation: "uat ja-pend", ipa: "/wɒt ˈhæpənd/", visualKey: "HelpCircle", audioText: "What happened?" }
        ]
      },
      {
        moduleId: "future_plans",
        title: "Futuro y planes",
        description: "Habla sobre tus metas y próximos pasos.",
        visualKey: "Rocket",
        lessons: [
          { id: "fut_going", spanish: "Voy a viajar", english: "I am going to travel", pronunciation: "ai am gou-ing tu tra-vel", ipa: "/aɪ æm ˈɡoʊɪŋ tuː ˈtrævəl/", visualKey: "Plane", audioText: "I am going to travel" },
          { id: "fut_will", spanish: "Lo haré mañana", english: "I will do it tomorrow", pronunciation: "ai uil du it to-mo-rou", ipa: "/aɪ wɪl duː ɪt təˈmɒroʊ/", visualKey: "Calendar", audioText: "I will do it tomorrow" },
          { id: "fut_maybe", spanish: "Tal vez vaya", english: "Maybe I will go", pronunciation: "mei-bi ai uil gou", ipa: "/ˈmeɪbi aɪ wɪl ɡoʊ/", visualKey: "HelpCircle", audioText: "Maybe I will go" },
          { id: "fut_next_year", spanish: "El próximo año", english: "Next year", pronunciation: "next ier", ipa: "/nɛkst jɪər/", visualKey: "Calendar", audioText: "Next year" },
          { id: "fut_goals", spanish: "Tengo grandes metas", english: "I have big goals", pronunciation: "ai jav big gouls", ipa: "/aɪ hæv bɪɡ ɡoʊlz/", visualKey: "Target", audioText: "I have big goals" },
          { id: "fut_meeting", spanish: "Nos veremos pronto", english: "We will meet soon", pronunciation: "ui uil mit sun", ipa: "/wiː wɪl miːt suːn/", visualKey: "Users", audioText: "We will meet soon" },
          { id: "fut_hope", spanish: "Espero que...", english: "I hope that...", pronunciation: "ai joup dat", ipa: "/aɪ hoʊp ðæt/", visualKey: "Heart", audioText: "I hope that" },
          { id: "fut_soon", spanish: "Muy pronto", english: "Very soon", pronunciation: "ve-ri sun", ipa: "/ˈvɛri suːn/", visualKey: "Clock", audioText: "Very soon" }
        ]
      }
    ]
  },
  {
    levelId: "advanced",
    levelTitle: "Nivel Avanzado",
    description: "Expresiones, argumentación y fluidez. (v2.0)",
    modules: [
      {
        moduleId: "job_interviews",
        title: "Entrevistas laborales",
        description: "Domina tu próxima entrevista en inglés.",
        visualKey: "Briefcase",
        lessons: [
          { id: "int_tell_me", spanish: "Cuéntame sobre ti", english: "Tell me about yourself", pronunciation: "tel mi a-baut iur-self", ipa: "/tɛl miː əˈbaʊt jʊərˈsɛlf/", visualKey: "User", audioText: "Tell me about yourself" },
          { id: "int_strengths", spanish: "¿Cuáles son tus fortalezas?", english: "What are your strengths?", pronunciation: "uat ar iur strengz", ipa: "/wɒt ɑːr jʊər strɛŋθs/", visualKey: "Zap", audioText: "What are your strengths?" },
          { id: "int_weakness", spanish: "¿Y tus debilidades?", english: "What about your weaknesses?", pronunciation: "uat a-baut iur uik-nes-es", ipa: "/wɒt əˈbaʊt jʊər ˈwiːknəsɪz/", visualKey: "AlertTriangle", audioText: "What about your weaknesses?" },
          { id: "int_experience", spanish: "Tengo mucha experiencia en...", english: "I have extensive experience in...", pronunciation: "ai jav eks-ten-siv eks-pi-riens in", ipa: "/aɪ hæv ɪkˈstɛnsɪv ɪkˈspɪəriəns ɪn/", visualKey: "Briefcase", audioText: "I have extensive experience in" },
          { id: "int_why_hire", spanish: "¿Por qué deberíamos contratarte?", english: "Why should we hire you?", pronunciation: "uai shuuld ui jai-er iu", ipa: "/waɪ ʃʊd wiː ˈhaɪər juː/", visualKey: "CheckCircle", audioText: "Why should we hire you?" },
          { id: "int_salary", spanish: "Mis expectativas salariales son...", english: "My salary expectations are...", pronunciation: "mai sa-la-ri eks-pec-tei-shons ar", ipa: "/maɪ ˈsæləri ˌɛkspɛkˈteɪʃənz ɑːr/", visualKey: "Wallet", audioText: "My salary expectations are" },
          { id: "int_goals", spanish: "¿Dónde te ves en cinco años?", english: "Where do you see yourself in five years?", pronunciation: "uer du iu si iur-self in faiv iers", ipa: "/wɛər duː juː siː jʊərˈsɛlf ɪn faɪv jɪərz/", visualKey: "Target", audioText: "Where do you see yourself in five years?" },
          { id: "int_questions", spanish: "¿Tienes alguna pregunta para nosotros?", english: "Do you have any questions for us?", pronunciation: "du iu jav e-ni cues-tions for as", ipa: "/duː juː hæv ˈɛni ˈkwɛstʃənz fɔːr ʌs/", visualKey: "HelpCircle", audioText: "Do you have any questions for us?" }
        ]
      },
      {
        moduleId: "professional_meetings",
        title: "Reuniones profesionales",
        description: "Participa activamente en juntas y llamadas.",
        visualKey: "Users",
        lessons: [
          { id: "mt_agenda", spanish: "El tema de hoy es...", english: "Today's agenda is...", pronunciation: "tu-deis a-yen-da is", ipa: "/təˈdeɪz əˈdʒɛndə ɪz/", visualKey: "FileText", audioText: "Today's agenda is" },
          { id: "mt_interrupt", spanish: "Disculpa que te interrumpa", english: "Sorry to interrupt you", pronunciation: "so-ri tu in-ter-rapt iu", ipa: "/ˈsɒri tuː ˌɪntəˈrʌpt juː/", visualKey: "AlertCircle", audioText: "Sorry to interrupt you" },
          { id: "mt_point", spanish: "Ese es un buen punto", english: "That is a valid point", pronunciation: "dat is a va-lid point", ipa: "/ðæt ɪz ə ˈvælɪd pɔɪnt/", visualKey: "CheckCircle", audioText: "That is a valid point" },
          { id: "mt_wrap_up", spanish: "Vamos a concluir la reunión", english: "Let's wrap up the meeting", pronunciation: "lets rap ap de mi-ting", ipa: "/lɛts ræp ʌp ðə ˈmiːtɪŋ/", visualKey: "Archive", audioText: "Let's wrap up the meeting" },
          { id: "mt_follow_up", spanish: "Haremos un seguimiento mañana", english: "We will follow up tomorrow", pronunciation: "ui uil fo-lou ap to-mo-rou", ipa: "/wiː wɪl ˈfɒloʊ ʌp təˈmɒroʊ/", visualKey: "Calendar", audioText: "We will follow up tomorrow" },
          { id: "mt_action_items", spanish: "Tareas pendientes", english: "Action items", pronunciation: "ac-shon ai-tems", ipa: "/ˈækʃən ˈaɪtəmz/", visualKey: "ListTodo", audioText: "Action items" },
          { id: "mt_consensus", spanish: "¿Estamos todos de acuerdo?", english: "Are we all in agreement?", pronunciation: "ar ui ol in a-gri-ment", ipa: "/ɑːr wiː ɔːl ɪn əˈɡriːmənt/", visualKey: "Check", audioText: "Are we all in agreement?" },
          { id: "mt_share", spanish: "Permíteme compartir mi pantalla", english: "Let me share my screen", pronunciation: "let mi sher mai skrin", ipa: "/lɛt miː ʃɛər maɪ skriːn/", visualKey: "Monitor", audioText: "Let me share my screen" }
        ]
      },
      {
        moduleId: "presentations_explanations",
        title: "Presentaciones",
        description: "Explica tus ideas de forma estructurada.",
        visualKey: "Presentation",
        lessons: [
          { id: "pr_overview", spanish: "Daré una visión general", english: "I will give an overview", pronunciation: "ai uil giv an o-ver-viu", ipa: "/aɪ wɪl ɡɪv ən ˈoʊvərˌvjuː/", visualKey: "Eye", audioText: "I will give an overview" },
          { id: "pr_slides", spanish: "Como pueden ver en la diapositiva...", english: "As you can see on the slide...", pronunciation: "as iu can si on de slaid", ipa: "/æz juː kæn siː ɒn ðə slaɪd/", visualKey: "Image", audioText: "As you can see on the slide" },
          { id: "pr_data", spanish: "Los datos sugieren que...", english: "The data suggests that...", pronunciation: "de dei-ta su-yests dat", ipa: "/ðə ˈdeɪtə səˈdʒɛsts ðæt/", visualKey: "BarChart", audioText: "The data suggests that" },
          { id: "pr_highlight", spanish: "Quiero resaltar esto", english: "I want to highlight this", pronunciation: "ai uant tu jai-lait dis", ipa: "/aɪ wɒnt tuː ˈhaɪˌlaɪt ðɪs/", visualKey: "Zap", audioText: "I want to highlight this" },
          { id: "pr_summary", spanish: "En resumen", english: "In summary", pronunciation: "in sa-ma-ri", ipa: "/ɪn ˈsʌməri/", visualKey: "FileText", audioText: "In summary" },
          { id: "pr_questions", spanish: "Estoy abierto a preguntas", english: "I am open to questions", pronunciation: "ai am o-pen tu cues-tions", ipa: "/aɪ æm ˈoʊpən tuː ˈkwɛstʃənz/", visualKey: "HelpCircle", audioText: "I am open to questions" },
          { id: "pr_next_steps", spanish: "Los siguientes pasos son...", english: "The next steps are...", pronunciation: "de next steps ar", ipa: "/ðə nɛkst stɛps ɑːr/", visualKey: "ArrowRight", audioText: "The next steps are" },
          { id: "pr_attention", spanish: "Gracias por su atención", english: "Thank you for your attention", pronunciation: "zank iu for iur a-ten-shon", ipa: "/θæŋk juː fɔːr jʊər əˈtɛnʃən/", visualKey: "Heart", audioText: "Thank you for your attention" }
        ]
      },
      {
        moduleId: "arguing_opinions",
        title: "Argumentar opiniones",
        description: "Defiende tus puntos de vista con elegancia.",
        visualKey: "Brain",
        lessons: [
          { id: "arg_strongly", spanish: "Creo firmemente que...", english: "I strongly believe that...", pronunciation: "ai strong-li bi-liv dat", ipa: "/aɪ ˈstrɒŋli bɪˈliːv ðæt/", visualKey: "ShieldCheck", audioText: "I strongly believe that" },
          { id: "arg_hand", spanish: "Por otro lado", english: "On the other hand", pronunciation: "on de o-der jand", ipa: "/ɒn ðə ˈʌðər hænd/", visualKey: "ArrowRightLeft", audioText: "On the other hand" },
          { id: "arg_furthermore", spanish: "Además / Es más", english: "Furthermore", pronunciation: "fer-der-mor", ipa: "/ˌfɜːrðərˈmɔːr/", visualKey: "PlusCircle", audioText: "Furthermore" },
          { id: "arg_evidence", spanish: "No hay evidencia de eso", english: "There is no evidence of that", pronunciation: "der is nou e-vi-dens of dat", ipa: "/ðɛər ɪz noʊ ˈɛvɪdəns əv ðæt/", visualKey: "Search", audioText: "There is no evidence of that" },
          { id: "arg_point_of_view", spanish: "Desde mi punto de vista", english: "From my point of view", pronunciation: "from mai point of viu", ipa: "/frɒm maɪ pɔɪnt əv vjuː/", visualKey: "Eye", audioText: "From my point of view" },
          { id: "arg_convinced", spanish: "No estoy convencido", english: "I am not convinced", pronunciation: "ai am not con-vinst", ipa: "/aɪ æm nɒt kənˈvɪnst/", visualKey: "AlertTriangle", audioText: "I am not convinced" },
          { id: "arg_conclusion", spanish: "En conclusión", english: "In conclusion", pronunciation: "in con-clu-shon", ipa: "/ɪn kənˈkluːʒən/", visualKey: "FileCheck", audioText: "In conclusion" },
          { id: "arg_respectfully", spanish: "Respetuosamente disiento", english: "I respectfully disagree", pronunciation: "ai res-pect-fu-li dis-a-gri", ipa: "/aɪ rɪˈspɛktfʊli ˌdɪsəˈɡriː/", visualKey: "Users", audioText: "I respectfully disagree" }
        ]
      },
      {
        moduleId: "problem_solving",
        title: "Resolución de problemas",
        description: "Encuentra soluciones y gestiona crisis.",
        visualKey: "Settings",
        lessons: [
          { id: "ps_issue", spanish: "Tenemos un problema", english: "We have an issue", pronunciation: "ui jav an i-shu", ipa: "/wiː hæv ən ˈɪʃuː/", visualKey: "AlertCircle", audioText: "We have an issue" },
          { id: "ps_solutions", spanish: "Busquemos soluciones", english: "Let's look for solutions", pronunciation: "lets luk for so-lu-shons", ipa: "/lɛts lʊk fɔːr səˈluːʃənz/", visualKey: "Lightbulb", audioText: "Let's look for solutions" },
          { id: "ps_root_cause", spanish: "La causa raíz es...", english: "The root cause is...", pronunciation: "de rut cos is", ipa: "/ðə ruːt kɔːz ɪz/", visualKey: "Search", audioText: "The root cause is" },
          { id: "ps_brainstorm", spanish: "Hagamos una lluvia de ideas", english: "Let's brainstorm", pronunciation: "lets brein-storm", ipa: "/lɛts ˈbreɪnstɔːrm/", visualKey: "Zap", audioText: "Let's brainstorm" },
          { id: "ps_fix", spanish: "Lo arreglaremos pronto", english: "We will fix it soon", pronunciation: "ui uil fiks it sun", ipa: "/wiː wɪl fɪks ɪt suːn/", visualKey: "Wrench", audioText: "We will fix it soon" },
          { id: "ps_plan_b", spanish: "Necesitamos un plan B", english: "We need a plan B", pronunciation: "ui nid a plan bi", ipa: "/wiː niːd ə plæn biː/", visualKey: "List", audioText: "We need a plan B" },
          { id: "ps_resolved", spanish: "El problema está resuelto", english: "The issue is resolved", pronunciation: "de i-shu is ri-solvd", ipa: "/ðə ˈɪʃuː ɪz rɪˈzɒlvd/", visualKey: "CheckCircle", audioText: "The issue is resolved" },
          { id: "ps_prevent", spanish: "Evitemos que vuelva a pasar", english: "Let's prevent it from happening again", pronunciation: "lets pri-vent it from ja-pe-ning a-gen", ipa: "/lɛts prɪˈvɛnt ɪt frəm ˈhæpənɪŋ əˈɡɛn/", visualKey: "ShieldCheck", audioText: "Let's prevent it from happening again" }
        ]
      },
      {
        moduleId: "tech_english",
        title: "Inglés para tecnología",
        description: "Vocabulario para el mundo digital.",
        visualKey: "Cpu",
        lessons: [
          { id: "te_software", spanish: "Desarrollo de software", english: "Software development", pronunciation: "soft-uer de-ve-lop-ment", ipa: "/ˈsɒftwɛər dɪˈvɛləpmənt/", visualKey: "Code", audioText: "Software development" },
          { id: "te_database", spanish: "Base de datos", english: "Database", pronunciation: "dei-ta-beis", ipa: "/ˈdeɪtəbeɪs/", visualKey: "Database", audioText: "Database" },
          { id: "te_cloud", spanish: "Computación en la nube", english: "Cloud computing", pronunciation: "claud com-piu-ting", ipa: "/klaʊd kəmˈpjuːtɪŋ/", visualKey: "Cloud", audioText: "Cloud computing" },
          { id: "te_bug", spanish: "Hay un error en el código", english: "There is a bug in the code", pronunciation: "der is a bag in de coud", ipa: "/ðɛər ɪz ə bʌɡ ɪn ðə koʊd/", visualKey: "Bug", audioText: "There is a bug in the code" },
          { id: "te_user_experience", spanish: "Experiencia de usuario", english: "User experience", pronunciation: "iu-ser eks-pi-riens", ipa: "/ˈjuːzər ɪkˈspɪəriəns/", visualKey: "Smile", audioText: "User experience" },
          { id: "te_deployment", spanish: "Despliegue a producción", english: "Deployment to production", pronunciation: "de-ploy-ment tu pro-dac-shon", ipa: "/dɪˈplɔɪmənt tuː prəˈdʌkʃən/", visualKey: "Rocket", audioText: "Deployment to production" },
          { id: "te_framework", spanish: "Estamos usando un framework", english: "We are using a framework", pronunciation: "ui ar iu-sing a freim-uerk", ipa: "/wiː ɑːr ˈjuːzɪŋ ə ˈfreɪmwɜːrk/", visualKey: "Layers", audioText: "We are using a framework" },
          { id: "te_security", spanish: "Ciberseguridad", english: "Cybersecurity", pronunciation: "sai-ber-si-kiu-ri-ti", ipa: "/ˌsaɪbərsɪˈkjʊərəti/", visualKey: "Lock", audioText: "Cybersecurity" }
        ]
      },
      {
        moduleId: "negotiation_agreements",
        title: "Negociación y acuerdos",
        description: "Cierra tratos y llega a consensos.",
        visualKey: "Handshake",
        lessons: [
          { id: "ne_terms", spanish: "Los términos del contrato", english: "The contract terms", pronunciation: "de con-tract terms", ipa: "/ðə ˈkɒntrækt tɜːrmz/", visualKey: "FileText", audioText: "The contract terms" },
          { id: "ne_win_win", spanish: "Una situación de ganar-ganar", english: "A win-win situation", pronunciation: "a uin uin si-tchu-ei-shon", ipa: "/ə wɪn wɪn ˌsɪtʃuˈeɪʃən/", visualKey: "Trophy", audioText: "A win-win situation" },
          { id: "ne_budget", spanish: "Está fuera de presupuesto", english: "It is over budget", pronunciation: "it is o-ver ba-yet", ipa: "/ɪt ɪz ˈoʊvər ˈbʌdʒɪt/", visualKey: "Wallet", audioText: "It is over budget" },
          { id: "ne_compromise", spanish: "Lleguemos a un acuerdo", english: "Let's find a compromise", pronunciation: "lets faind a com-pro-mais", ipa: "/lɛts faɪnd ə ˈkɒmprəmaɪz/", visualKey: "CheckCircle", audioText: "Let's find a compromise" },
          { id: "ne_discount", spanish: "¿Pueden ofrecernos un descuento?", english: "Can you offer a discount?", pronunciation: "can iu o-fer a dis-caunt", ipa: "/kæn juː ˈɒfər ə ˈdɪskaʊnt/", visualKey: "Tag", audioText: "Can you offer a discount?" },
          { id: "ne_deadline", spanish: "La fecha límite es inamovible", english: "The deadline is firm", pronunciation: "de ded-lain is ferm", ipa: "/ðə ˈdɛdlaɪn ɪz fɜːrm/", visualKey: "Clock", audioText: "The deadline is firm" },
          { id: "ne_signature", spanish: "Necesitamos su firma", english: "We need your signature", pronunciation: "ui nid iur sig-na-tchur", ipa: "/wiː niːd jʊər ˈsɪɡnətʃər/", visualKey: "Pen", audioText: "We need your signature" },
          { id: "ne_deal", spanish: "¡Tenemos un trato!", english: "We have a deal!", pronunciation: "ui jav a dil", ipa: "/wiː hæv ə diːl/", visualKey: "Handshake", audioText: "We have a deal!" }
        ]
      },
      {
        moduleId: "advanced_fluency",
        title: "Fluidez avanzada",
        description: "Expresiones idiomáticas y modismos.",
        visualKey: "Zap",
        lessons: [
          { id: "fl_break_ice", spanish: "Romper el hielo", english: "Break the ice", pronunciation: "breik de ais", ipa: "/breɪk ðə aɪs/", visualKey: "Snowflake", audioText: "Break the ice" },
          { id: "fl_piece_cake", spanish: "Pan comido / Muy fácil", english: "A piece of cake", pronunciation: "a pis of keik", ipa: "/ə piːs əv keɪk/", visualKey: "Croissant", audioText: "A piece of cake" },
          { id: "fl_weather", spanish: "Sentirse un poco mal", english: "Feel under the weather", pronunciation: "fil an-der de ue-der", ipa: "/fiːl ˈʌndər ðə ˈwɛðər/", visualKey: "CloudRain", audioText: "Feel under the weather" },
          { id: "fl_cost_arm", spanish: "Costar un ojo de la cara", english: "Cost an arm and a leg", pronunciation: "cost an arm and a leg", ipa: "/kɒst ən ɑːrm ənd ə lɛɡ/", visualKey: "Wallet", audioText: "Cost an arm and a leg" },
          { id: "fl_hit_books", spanish: "Ponerse a estudiar", english: "Hit the books", pronunciation: "jit de buks", ipa: "/hɪt ðə bʊks/", visualKey: "BookOpen", audioText: "Hit the books" },
          { id: "fl_call_day", spanish: "Dar por terminado el día", english: "Call it a day", pronunciation: "col it a dei", ipa: "/kɔːl ɪt ə deɪ/", visualKey: "Sun", audioText: "Call it a day" },
          { id: "fl_no_brainer", spanish: "Es algo obvio", english: "It is a no-brainer", pronunciation: "it is a nou brei-ner", ipa: "/ɪt ɪz ə noʊˈbreɪnər/", visualKey: "Brain", audioText: "It is a no-brainer" },
          { id: "fl_keep_touch", spanish: "Mantente en contacto", english: "Keep in touch", pronunciation: "kip in tatch", ipa: "/kiːp ɪn tʌtʃ/", visualKey: "Phone", audioText: "Keep in touch" }
        ]
      }
    ]
  }
];
