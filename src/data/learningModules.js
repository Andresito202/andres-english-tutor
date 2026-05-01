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
        visualKey: "sun",
        lessons: [
          { id: "hello", spanish: "Hola", english: "Hello", pronunciation: "jelou", ipa: "/həˈloʊ/", visualKey: "hand", audioText: "Hello" },
          { id: "good_morning", spanish: "Buenos días", english: "Good morning", pronunciation: "gud mor-ning", ipa: "/gʊd ˈmɔr nɪŋ/", visualKey: "sun", audioText: "Good morning" },
          { id: "good_afternoon", spanish: "Buenas tardes", english: "Good afternoon", pronunciation: "gud af-ter-nun", ipa: "/gʊd ˌæf tərˈnun/", visualKey: "sun", audioText: "Good afternoon" },
          { id: "good_evening", spanish: "Buenas noches (al llegar)", english: "Good evening", pronunciation: "gud i-vning", ipa: "/gʊd ˈiv nɪŋ/", visualKey: "moon", audioText: "Good evening" },
          { id: "good_night", spanish: "Buenas noches (al despedirse)", english: "Good night", pronunciation: "gud nait", ipa: "/gʊd ˈnaɪt/", visualKey: "moon", audioText: "Good night" },
          { id: "goodbye", spanish: "Adiós", english: "Goodbye", pronunciation: "gud-bai", ipa: "/gʊdˈbaɪ/", visualKey: "hand", audioText: "Goodbye" },
          { id: "see_you", spanish: "Nos vemos", english: "See you", pronunciation: "si yu", ipa: "/si ju/", visualKey: "eye", audioText: "See you" },
          { id: "please", spanish: "Por favor", english: "Please", pronunciation: "pliz", ipa: "/pliz/", visualKey: "star", audioText: "Please" },
          { id: "thank_you", spanish: "Gracias", english: "Thank you", pronunciation: "zank iu", ipa: "/θæŋk ju/", visualKey: "heart", audioText: "Thank you" },
          { id: "you_welcome", spanish: "De nada", english: "You're welcome", pronunciation: "iur wel-com", ipa: "/jʊər ˈwɛlkəm/", visualKey: "smile", audioText: "You're welcome" }
        ]
      },
      {
        moduleId: "introductions",
        title: "Presentaciones personales",
        description: "Aprende a presentarte y preguntar cómo están los demás.",
        visualKey: "users",
        lessons: [
          { id: "how_are_you", spanish: "¿Cómo estás?", english: "How are you?", pronunciation: "jau ar yu", ipa: "/haʊ ɑr ju/", visualKey: "message", audioText: "How are you?" },
          { id: "im_fine", spanish: "Estoy bien, gracias", english: "I am fine, thank you", pronunciation: "ai am fain, zank iu", ipa: "/aɪ æm faɪn, θæŋk ju/", visualKey: "smile", audioText: "I am fine, thank you" },
          { id: "my_name_is", spanish: "Mi nombre es...", english: "My name is...", pronunciation: "mai neim is...", ipa: "/maɪ neɪm ɪz/", visualKey: "user", audioText: "My name is" },
          { id: "whats_your_name", spanish: "¿Cuál es tu nombre?", english: "What is your name?", pronunciation: "uat is iur neim", ipa: "/wʌt ɪz jʊər neɪm/", visualKey: "help", audioText: "What is your name?" },
          { id: "nice_to_meet", spanish: "Mucho gusto", english: "Nice to meet you", pronunciation: "nais tu mit yu", ipa: "/naɪs tu mit ju/", visualKey: "handshake", audioText: "Nice to meet you" },
          { id: "where_from", spanish: "¿De dónde eres?", english: "Where are you from?", pronunciation: "uer ar yu from", ipa: "/wɛər ɑr ju frʌm/", visualKey: "map", audioText: "Where are you from?" },
          { id: "im_from", spanish: "Soy de...", english: "I am from...", pronunciation: "ai am from...", ipa: "/aɪ æm frʌm/", visualKey: "map", audioText: "I am from" },
          { id: "yes", spanish: "Sí", english: "Yes", pronunciation: "ies", ipa: "/jɛs/", visualKey: "check", audioText: "Yes" },
          { id: "no", spanish: "No", english: "No", pronunciation: "nou", ipa: "/noʊ/", visualKey: "x", audioText: "No" },
          { id: "excuse_me", spanish: "Disculpa / Con permiso", english: "Excuse me", pronunciation: "eks-kius mi", ipa: "/ɪkˈskjuz mi/", visualKey: "alert", audioText: "Excuse me" }
        ]
      },
      {
        moduleId: "numbers",
        title: "Números",
        description: "Los números del 1 al 10 y decenas.",
        visualKey: "hash",
        lessons: [
          { id: "num_1", spanish: "Uno", english: "One", pronunciation: "uan", ipa: "/wʌn/", visualKey: "number", audioText: "One" },
          { id: "num_2", spanish: "Dos", english: "Two", pronunciation: "tu", ipa: "/tu/", visualKey: "number", audioText: "Two" },
          { id: "num_3", spanish: "Tres", english: "Three", pronunciation: "zri", ipa: "/θri/", visualKey: "number", audioText: "Three" },
          { id: "num_4", spanish: "Cuatro", english: "Four", pronunciation: "for", ipa: "/fɔr/", visualKey: "number", audioText: "Four" },
          { id: "num_5", spanish: "Cinco", english: "Five", pronunciation: "faiv", ipa: "/faɪv/", visualKey: "number", audioText: "Five" },
          { id: "num_6", spanish: "Seis", english: "Six", pronunciation: "siks", ipa: "/sɪks/", visualKey: "number", audioText: "Six" },
          { id: "num_7", spanish: "Siete", english: "Seven", pronunciation: "se-ven", ipa: "/ˈsɛv ən/", visualKey: "number", audioText: "Seven" },
          { id: "num_8", spanish: "Ocho", english: "Eight", pronunciation: "eit", ipa: "/eɪt/", visualKey: "number", audioText: "Eight" },
          { id: "num_9", spanish: "Nueve", english: "Nine", pronunciation: "nain", ipa: "/naɪn/", visualKey: "number", audioText: "Nine" },
          { id: "num_10", spanish: "Diez", english: "Ten", pronunciation: "ten", ipa: "/tɛn/", visualKey: "number", audioText: "Ten" }
        ]
      },
      {
        moduleId: "colors",
        title: "Colores",
        description: "Aprende los colores básicos.",
        visualKey: "palette",
        lessons: [
          { id: "col_red", spanish: "Rojo", english: "Red", pronunciation: "red", ipa: "/rɛd/", visualKey: "circle", audioText: "Red" },
          { id: "col_blue", spanish: "Azul", english: "Blue", pronunciation: "blu", ipa: "/blu/", visualKey: "circle", audioText: "Blue" },
          { id: "col_yellow", spanish: "Amarillo", english: "Yellow", pronunciation: "ie-lou", ipa: "/ˈjɛl oʊ/", visualKey: "circle", audioText: "Yellow" },
          { id: "col_green", spanish: "Verde", english: "Green", pronunciation: "grin", ipa: "/grin/", visualKey: "circle", audioText: "Green" },
          { id: "col_black", spanish: "Negro", english: "Black", pronunciation: "blak", ipa: "/blæk/", visualKey: "circle", audioText: "Black" },
          { id: "col_white", spanish: "Blanco", english: "White", pronunciation: "uait", ipa: "/waɪt/", visualKey: "circle", audioText: "White" },
          { id: "col_orange", spanish: "Naranja", english: "Orange", pronunciation: "o-ranch", ipa: "/ˈɔr ɪndʒ/", visualKey: "circle", audioText: "Orange" },
          { id: "col_purple", spanish: "Morado", english: "Purple", pronunciation: "per-pl", ipa: "/ˈpɜr pəl/", visualKey: "circle", audioText: "Purple" }
        ]
      },
      {
        moduleId: "family",
        title: "Familia",
        description: "Miembros de la familia.",
        visualKey: "home",
        lessons: [
          { id: "fam_mother", spanish: "Madre", english: "Mother", pronunciation: "mo-der", ipa: "/ˈmʌð ər/", visualKey: "user", audioText: "Mother" },
          { id: "fam_father", spanish: "Padre", english: "Father", pronunciation: "fa-der", ipa: "/ˈfɑ ðər/", visualKey: "user", audioText: "Father" },
          { id: "fam_brother", spanish: "Hermano", english: "Brother", pronunciation: "bro-der", ipa: "/ˈbrʌð ər/", visualKey: "user", audioText: "Brother" },
          { id: "fam_sister", spanish: "Hermana", english: "Sister", pronunciation: "sis-ter", ipa: "/ˈsɪs tər/", visualKey: "user", audioText: "Sister" },
          { id: "fam_son", spanish: "Hijo", english: "Son", pronunciation: "san", ipa: "/sʌn/", visualKey: "user", audioText: "Son" },
          { id: "fam_daughter", spanish: "Hija", english: "Daughter", pronunciation: "do-ter", ipa: "/ˈdɔ tər/", visualKey: "user", audioText: "Daughter" },
          { id: "fam_grandfather", spanish: "Abuelo", english: "Grandfather", pronunciation: "gran-fa-der", ipa: "/ˈgrændˌfɑ ðər/", visualKey: "user", audioText: "Grandfather" },
          { id: "fam_grandmother", spanish: "Abuela", english: "Grandmother", pronunciation: "gran-mo-der", ipa: "/ˈgrændˌmʌð ər/", visualKey: "user", audioText: "Grandmother" }
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
          { id: "verb_eat", spanish: "Comer", english: "Eat", pronunciation: "it", ipa: "/it/", visualKey: "Coffee", audioText: "Eat" },
          { id: "verb_drink", spanish: "Beber", english: "Drink", pronunciation: "drink", ipa: "/drɪŋk/", visualKey: "Coffee", audioText: "Drink" },
          { id: "verb_sleep", spanish: "Dormir", english: "Sleep", pronunciation: "slip", ipa: "/slip/", visualKey: "Moon", audioText: "Sleep" },
          { id: "verb_go", spanish: "Ir", english: "Go", pronunciation: "gou", ipa: "/goʊ/", visualKey: "ArrowRight", audioText: "Go" }
        ]
      },
      {
        moduleId: "time",
        title: "La Hora",
        description: "Aprende a decir y preguntar la hora.",
        visualKey: "Clock",
        lessons: [
          { id: "time_what", spanish: "¿Qué hora es?", english: "What time is it?", pronunciation: "uat taim is it", ipa: "/wʌt taɪm ɪz ɪt/", visualKey: "Clock", audioText: "What time is it?" },
          { id: "time_oclock", spanish: "En punto", english: "O'clock", pronunciation: "o-clok", ipa: "/əˈklɒk/", visualKey: "Clock", audioText: "O'clock" }
        ]
      },
      {
        moduleId: "days",
        title: "Días y Meses",
        description: "Calendario y organización del tiempo.",
        visualKey: "Calendar",
        lessons: [
          { id: "day_mon", spanish: "Lunes", english: "Monday", pronunciation: "man-dei", ipa: "/ˈmʌn deɪ/", visualKey: "Calendar", audioText: "Monday" },
          { id: "month_jan", spanish: "Enero", english: "January", pronunciation: "yan-iu-e-ri", ipa: "/ˈdʒæn juˌɛr i/", visualKey: "Calendar", audioText: "January" }
        ]
      }
    ]
  },
  {
    levelId: "intermediate",
    levelTitle: "Nivel Intermedio",
    description: "Conversaciones, trabajo y viajes.",
    modules: []
  },
  {
    levelId: "advanced",
    levelTitle: "Nivel Avanzado",
    description: "Expresiones, argumentación y fluidez.",
    modules: []
  }
];
