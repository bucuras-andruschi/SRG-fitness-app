import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/authContext'
import { doSignOut } from "../../firebase/auth";
import { Link, useNavigate } from 'react-router-dom'
import './home.css'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const allRecipes = [
    {
        name: 'Pumpkin Soup',
        ingredients: ['2 tbsp Coles Olive Oil', '1 onion, finely chopped', '1 leek, white part only, finely sliced', '1 garlic clove, crushed', '1/2 tsp ground coriander', '1 tsp ground cumin', '1/2 tsp freshly grated nutmeg', '1kg peeled pumpkin diced', '1 large potato, peeled, diced', '1L Massel chicken style liquid stock or vegetable liquid stock', '125ml thin cream'],
        instructions: 'Heat oil in a large saucepan over low heat, add onion and leek and cook for 2-3 minutes, until softened but not coloured. Add garlic, coriander, cumin, and nutmeg and cook, stirring, for 30 seconds. Add pumpkin, potato and stock and bring to the boil. Turn heat to low, cover and simmer for 30 minutes. Allow to cool slightly, then blend in batches. Return soup to pan, stir through cream and reheat gently. Season and add a little more nutmeg if desired.',
        image: '/1.jpg',
    },
    {
        name: 'Zucchini slice',
        ingredients: ['5 Coles Australian Free Range Eggs', '150g Coles White Self Raising Flour, sifted', '375g zucchini, grated', '1 large onion, finely chopped', '200g rindless bacon, chopped', '1 cup grated cheddar cheese', '60ml vegetable oil'] ,
        instructions: 'Preheat oven to 170C. Beat the eggs in a large bowl until combined. Add the flour and beat until smooth, then add zucchini, onion, bacon, cheese and oil and stir to combine. Grease and line a 30 x 20cm lamington pan. Pour into the prepared pan and bake in oven for 30 minutes or until cooked through.',
        image: '/2.jpeg'
    },
    {
        name: 'Fried rice',
        ingredients: ['1 cup Coles Long Grain White Rice', '2 tsp vegetable oil', '2 eggs, lightly whisked', '2 bacon rashers, chopped', '1 carrot, peeled and grated', '2 shallots, trimmed, finely sliced', '1/2 cup frozen peas, thawed', '1 tbsp soy sauce', 'Sesame seeds, to serve', 'Shallots, sliced, extra, to serve'],
        instructions: 'Cook the rice in a large saucepan of boiling water for 12 minutes or until tender. Drain and leave to cool. Heat oil in non-stick wok or large frying pan over medium heat. Add eggs. Swirl over base to form an omelette. Cook for 2 minutes or until set. Transfer to a chopping board. Set aside to cool slightly. Roll up and thickly slice. Add bacon to wok. Cook 4 minutes until light golden. Add carrot. Stir fry 1 minute. Add shallots, peas and rice. Cook, stirring, 3-4 minutes. Add egg and soy sauce. Stir until heated through. Sprinkle with sesame seeds and top with extra shallots. Serve immediately.',
        image:'/3.jpg'
    },
    {
        name: 'Thai beef',
        ingredients: ['1 1/2 tbsp fresh lime juice', '1 garlic clove, crushed', '1 tbsp finely chopped palm sugar', '1 tbsp fish sauce', '2 tsp sesame oil', '1 tsp Coles Asia soy sauce', '2 tsp finely grated fresh ginger', '1 (about 680g) beef rump steak', '1 x 200g pkt grape tomatoes, quartered', '1 continental cucumber, halved lengthways, thinly sliced diagonally', '1 red onion, halved, cut into thin wedges', '2 long fresh red chillies, halved, deseeded, thinly sliced lengthways', '1 bunch fresh mint, leaves picked, large leaves torn', '1 bunch fresh coriander, leaves picked', '1 bunch fresh Thai basil, leaves picked, large leaves torn', '55g (1/3 cup) toasted peanuts, coarsely chopped', '4 makrut lime leaves, centre veins removed, finely shredded'],
        instructions: 'Whisk together lime juice, garlic, fish sauce, sesame oil, soy sauce, ginger and palm sugar in a jug. Place the steak in a glass or ceramic dish. Drizzle with half the dressing. Cover with plastic wrap and place in the fridge, turning occasionally, for 2 hours to develop the flavours. Preheat a barbecue grill or chargrill pan on high. Cook steak on grill for 2-3 minutes each side for medium or until cooked to your liking. Transfer to a plate. Cover with foil and set aside for 10 minutes to rest.Place the tomato, cucumber, onion, chilli, mint, coriander, basil, peanuts and lime leaves in a large bowl. Thinly slice steak across the grain and add to the salad. Drizzle with remaining dressing and gently toss to combine. Divide salad among bowls and serve immediately.',
        image: '/4.webp'
    },
    {
        name: 'Chicken and vegetable stir-fry',
        ingredients: ['2 tbsp peanut oil', '3 chicken breast fillets, trimmed, cut across the grain into thin strips', '1 brown onion, cut into thin wedges', '1 red capsicum, deseeded, cut into thin strips', '250g button mushrooms or mushroom caps, sliced', '1 bunch broccolini, cut into 4cm lengths', '2cm piece fresh ginger, peeled, finely grated or chopped', '2 garlic cloves, finely chopped', '2 fresh birdseye chillies, deseeded if desired, thinly sliced', '2 tbsp salt-reduced soy sauce', '1 1/2 tbsp oyster sauce', '1 tbsp water', '100g bean sprouts, to serve', 'Coriander leaves, to serve', 'Coles White Medium Grain Rice, to serve'],
        instructions: 'Heat wok over high heat for about 1 minute. Add 1 tablespoon of the oil and swirl it around the wok to coat the entire cooking surface and heat for 30-60 seconds or until very hot. Add half the chicken strips and stir-fry for 1-2 minutes or until the chicken is sealed and just cooked through . Transfer the chicken to a plate and set aside. Add about half the remaining peanut oil to the wok and repeat the process with the remaining chicken strips. Add the remaining oil to the wok and heat over high heat until hot. Add the onion and capsicum and stir-fry for 2 minutes. Add the mushrooms and broccolini and stir-fry for a further 2 minutes. Add the ginger, garlic and chillies. Season with salt and stir-fry for 1 minute or until aromatic. Add the soy sauce, oyster sauce and water and toss for about 1 minute. Return the chicken to the wok and stir until the vegetables and chicken are coated with the sauces and the vegetables are tender crisp. Remove the wok from the heat, toss through the bean sprouts and coriander and serve the stir-fry immediately with cooked rice or noodles.',
        image: '/5.jpg'
    },
    {
        name: 'San choy bau',
        ingredients: ['1 tbsp peanut oil', '2 garlic cloves, crushed', '2cm piece ginger, finely grated', '500g Coles Extra Lean Pork Mince', '1 tbsp soy sauce', '2 tbsp oyster sauce', '3 shallots, thinly sliced', '2 tsp fresh lime juice', '1 tsp sesame oil', '1 cup beansprouts, trimmed', '12 large lettuce leaves', '1/4 cup fresh coriander leaves', '1/4 cup chopped roasted peanuts, optional'],
        instructions: 'Heat wok over high heat until hot. Add peanut oil and swirl to coat. Add garlic, ginger and pork. Stir-fry for 2 to 3 minutes or until pork just changes colour.Add soy sauce and oyster. Add shallots, 2 teaspoons of lime juice and sesame oil to wok. Stir-fry for 3 minutes or until heated through. Stir in beansprouts. Spoon pork mixture into lettuce leaves. Sprinkle with coriander and peanuts, if using. Serve.',
        image: '/6.jpg'
    },
    {
        name: 'Spaghetti bolognese',
        ingredients: ['1 tbsp olive oil', '1 brown onion, finely chopped', '1 carrot, peeled, finely chopped', '1 celery stick, trimmed, finely chopped', '2 garlic cloves, crushed', '500g Coles Finest Carbon Neutral Beef Mince', '1/3 cup tomato paste', '2 x 400g cans diced tomatoes', '1 tsp oregano leaves', 'Large pinch ground nutmeg', '2 tsp sweetener', '1/2 cup water', '500g thin spaghetti', 'Fresh basil leaves, to serve', 'Parmesan cheese, shaved, to serve'],
        instructions: 'Heat oil in a large saucepan over medium-high heat. Cook onion, carrot, celery and garlic, stirring, for 5 minutes or until softened. Add mince. Cook, breaking up with a wooden spoon, for 6 to 8 minutes or until browned. Add paste, tomatoes, oregano, nutmeg, sweetener and water. Bring to the boil. Reduce heat to low. Simmer, uncovered, for 20 to 30 minutes or until thick. Season with salt and pepper. Meanwhile, cook pasta in a large saucepan of boiling, salted water, following packet directions, until tender. Drain. Divide pasta among serving bowls. Spoon over sauce. Serve topped with cheese and fresh basil.',
        image: '/7.jpg'
    },
    {
        name: 'Minestrone soup',
        ingredients: ['3 bacon rashers, rind removed, roughly chopped', '2 carrots, peeled, chopped', '2 celery sticks, chopped', '1 desiree potato, peeled, chopped', '2 garlic cloves, crushed', '1L (4 cups) Massel beef style liquid stock', 'Mutti Polpa Finely Chopped Tomatoes', '400g can Coles Red Kidney Beans, rinsed, drained', '80g (1 cup) small shell pasta', '1/3 cup chopped fresh continental parsley'],
        instructions: 'Place the bacon, carrots, celery and potato in a large saucepan and stir to combine. Cook over high heat, uncovered, stirring often, for 5 minutes. Add the garlic, beef stock, tomatoes and red kidney beans to the pan, cover and bring to the boil. Reduce heat to medium-low. Simmer, covered, stirring occasionally, for 30 minutes or until the vegetables are tender. Increase heat to high. Add pasta and cook, uncovered, stirring occasionally, following packet directions or until pasta is al dente. Season with salt and pepper. Ladle into serving bowls and sprinkle with parsley. Serve immediately.',
        image: '/8.webp'
    },
    {
        name: 'Beef stroganoff',
        ingredients: ['2 tbsp plain flour', '700g beef rump steak, trimmed, thinly sliced', '40g butter, chopped', '1 1/2 tbsp olive oil', '1 large brown onion, halved, thinly sliced', '2 garlic cloves, finely chopped', '1/2 tsp sweet paprika', '400g button mushrooms, sliced', '1/2 cup dry white wine', '3/4 cup Massel beef style stock', '2 tbsp Coles Tomato Paste', '3 tsp dijon mustard', '1/4 cup creme fraiche', 'Cooked fettuccine, to serve', 'Chopped fresh flat-leaf parsley, to serve'],
        instructions: 'Place flour and beef in a snap-lock bag. Season with salt and pepper. Shake to coat. Place 20g of butter and 2 teaspoons of oil in a large frying pan. Cook over high heat until bubbling. Add half the beef. Cook, stirring, for 3 to 5 minutes or until browned. Transfer to a plate. Repeat with remaining butter, 2 teaspoons of oil and beef. Reduce heat to medium. Heat remaining oil in pan. Add onion and mushroom. Cook, stirring, for 5 minutes or until soft. Add garlic and paprika. Cook, stirring, for 1 minute. Add wine, stock, tomato paste, mustard and beef to pan. Stir to combine. Bring to the boil. Reduce heat to low. Simmer for 5 minutes or until sauce has thickened slightly. Stir in creme fraiche. Serve stroganoff with pasta and parsley. Watch our step-by-step video below to see how to make our Beef stroganoff recipe.',
        image: '/9.jpg'
    },
    {
        name: 'Cauliflower soup',
        ingredients: ['1 tbsp Classic Olive Oil', '1 large brown onion, chopped', '2 garlic cloves, crushed', '1 head (1.3kg) cauliflower, cut into florets', '500g sebago potatoes, peeled, chopped', '1 litre Massel chicken style liquid stock', '1/2 cup pure cream'],
        instructions: 'Heat oil in a large saucepan over medium-high heat. Add onion and garlic. Cook, stirring, for 3 minutes or until onion has softened. Add cauliflower and potato. Cook, stirring, for 5 minutes. Add stock. Season with pepper. Cover. Bring to the boil. Reduce heat to medium-low. Simmer for 15 to 20 minutes or until potato is tender. Set aside for 5 minutes to cool slightly. Blend, in batches, until smooth. Return to pan over low heat. Add pure cream. Cook, stirring, for 2 minutes or until heated through. Serve.',
        image: '/10.webp'
    },
    {
        name:'Chilli con carne',
        ingredients: ['2 tsp olive oil', '125g rindless bacon, roughly chopped', '750g Coles 5 Star Extra Lean Beef Mince', '2 medium brown onions, finely chopped', '2 medium red capsicums, chopped', '3 garlic cloves, crushed', '1 long red chilli, chopped', '2 tbsp Mexican chilli powder', '800g can chopped tomatoes', '400g can Coles red kidney beans, drained, rinsed'],
        instructions: 'Heat oil in a large saucepan over medium heat. Add bacon. Cook for 5 to 6 minutes or until crisp. Add mince. Cook, stirring with a wooden spoon to break up mince, for 15 minutes or until browned. Add onions, capsicums, garlic and chopped chilli. Cook for 5 to 6 minutes or until vegetables are soft. Add chilli powder. Cook, stirring, for 1 minute or until fragrant. Add tomatoes and 1 cup cold water. Bring to the boil. Reduce heat to medium-low. Simmer, partially covered, for 30 minutes or until sauce has reduced slightly. Add beans. Increase heat to medium. Cook for 15 minutes or until beans are heated through and sauce has thickened. Serve chilli with toppings.',
        image:'/11.jpg'
    },
    {
        name: 'Roast lamb',
        ingredients: ['2kg leg of lamb, fat trimmed', '1/4 cup olive oil', '1 tbsp chopped fresh rosemary leaves', '2 garlic cloves, crushed', '1.5kg chat potatoes', '2 cups Massel beef style stock', '3/4 cup red wine', '2 1/2 tbsp Coles White Plain Flour'],
        instructions: 'Preheat oven to 200°C/180°C fan-forced. Lightly grease roasting pan. Place lamb in pan. Combine oil, rosemary and garlic in a bowl. Rub half the oil mixture over lamb. Season with salt and pepper. Roast for 15 minutes. Reduce oven temperature to 180°C/160°C fan-forced. Roast lamb, basting with remaining oil mixture every 20 minutes, for 1 hour 15 minutes for medium or until cooked to your liking. Add potatoes to pan for last 40 minutes, turning halfway through cooking. Remove lamb from oven. Cover loosely with foil. Stand for 10 minutes. Carve. Serve with potatoes. Basic Gravy: Transfer meat (and any vegetables) to a plate to rest. Combine stock and wine in a jug. Skim fat from roasting pan, leaving 1 1/2 tablespoons pan juices and fat in pan. Place pan over high heat. Add flour. Cook, stirring with a wooden spoon, for 1 to 2 minutes or until mixture bubbles and becomes golden. Add juices from resting meat. Slowly add stock mixture to pan, stirring constantly. Cook, scraping pan, for 8 to 10 minutes or until thickened.',
        image: '/12.jpeg'
    },
    {
        name:'Beef and vegetable stir fry',
        ingredients: ['1 1/2 tbsp peanut oil', '500g lean beef rump steak, cut across the grain into thin strips', '1 brown onion, halved, thinly sliced', '1 large red capsicum, cut into short, thin strips', '125g pkt baby corn, halved lengthways', '1 bunch broccolini, cut into 4cm lengths', '1 tbsp water', '1 1/2 tbsp soy sauce', '2 garlic cloves, crushed', '2 tbsp oyster sauce', 'Coles White Medium Grain Rice, steamed, to serve'],
        instructions: 'Heat a large wok over high heat. Once the wok is hot, add 1 tablespoon of the oil and carefully swirl around to coat the side of the wok. Heat until very hot. Stir-fry the beef, in three batches, for 1-2 minutes each batch or until the beef is browned and just cooked. Transfer each batch to a plate, reheating the wok between each batch. Heat remaining oil in the wok over medium-high heat. Add the onion, capsicum, corn and broccolini. Stir-fry for 2 minutes. Add the water, cover and cook for 30-60 seconds or until the vegetables are just tender. Add the soy sauce, garlic and oyster sauce to the wok. Toss well to combine. Add the beef and toss until heated through. Serve immediately with rice.',
        image:'/13.jpg'
    },
    {
        name: 'Zucchini fritters',
        ingredients: ['3 (about 400g) medium zucchini', '75g (1/2 cup) self-raising flour', '40g (1/2 cup) parmesan, finely grated', '3 shallots, ends trimmed, thinly sliced', '1 egg, whisked', '1/4 cup fresh continental parsley, chopped', '2 tsp dried oregano leaves', '1/4 tsp ground nutmeg', '1 tsp salt', '1 tbsp olive oil'],
        instructions: 'Trim the ends from zucchini and coarsely grate. Place in a colander and squeeze out as much excess moisture as possible. Transfer to a bowl. Stir in self-raising flour, parmesan, shallots, egg, parsley, oregano, nutmeg and salt. Heat 1 teaspoon olive oil in a non-stick frying pan over medium-high heat. Drop three portions of zucchini mixture into pan. Cook for 1 1/2 minutes each side or until golden and cooked through. Transfer to a plate. Repeat with remaining olive oil and remaining zucchini mixture.',
        image:'/14.jpeg'
    },
    {
        name:'Warming chicken soup',
        ingredients: ['4 (about 900g) chicken thigh cutlets, skinned, excess fat trimmed', '1 large brown onion, halved, finely chopped', '1 large carrot, peeled, finely chopped', '1 celery stick, trimmed, finely chopped', '2 large garlic cloves, finely chopped', '2 tbsp finely chopped fresh continental parsley stems', '6 sprigs fresh thyme, leaves picked', '2L (8 cups) water', '1/2 tsp whole black peppercorns', 'Sea salt flakes', '1/4 cup finely chopped fresh continental parsley, extra'],
        instructions: 'Combine chicken, onion, carrot, celery, garlic, parsley, thyme, water and peppercorns in a large saucepan over medium-high heat. Bring to the boil. Reduce heat to low and cook, covered, for 40 minutes or until vegetables are very tender. Use tongs to transfer the chicken to a clean work surface. Hold with tongs and cut the chicken meat from the bones. Discard bones. Tear the chicken meat and add to the soup. Taste and season with sea salt. Ladle soup among serving bowls. Sprinkle with parsley and serve immediately.',
        image:'/15.jpg'
    },
    {
        name: 'Stir-fried rice noodles with chicken and vegetables',
        ingredients: ['1/4 cup (60ml) Maggi Oyster Sauce', '2 tbsp Pearl River Bridge Superior Light Soy Sauce', '1 tbsp Lee Kum Kee Chilli Garlic Sauce (optional)', '150g Erawan Pad Thai Noodles', '2 tbsp olive oil, divided', '500g Coles RSPCA Approved Chicken Mince', '120g fresh loose cup mushrooms, thinly sliced', '1 carrot, peeled, cut into thin matchstick-size strips (about 100g)', '1 small brown onion, thinly sliced (about 150g)', '1 spring onion, thinly sliced'],
        instructions: 'In a small bowl, whisk the oyster sauce, soy sauce, chilli garlic sauce, if using, and 2 tablespoons water. In a large pot of heavily salted boiling water, cook the noodles for 4-5 mins or until al dente. Rinse the noodles under cold water. Drain. Heat 1 tablespoon of the oil in a wok or large heavy frying pan over medium-high heat. Add the chicken and cook, without stirring, for 2 mins or until the chicken is well browned on the bottom. Continue cooking, breaking up the chicken into small clusters, for 2-3 mins or until just cooked through. Transfer the chicken to a heatproof bowl and set aside. In the wok over high heat, heat the remaining 1 tablespoon oil. When the oil is smoking, add the mushrooms, carrot and onion and stir-fry for 2 mins or until the mushrooms are tender. Stir in the cooked chicken and then the sauce mixture. Add the noodles and toss until well combined and heated through.',
        image:'/16.jpg'
    },
    {
        name: 'Chicken and vegetable soup',
        ingredients: ['2 tbsp olive oil', '1 leek, halved, washed, thinly sliced', '2 garlic cloves, crushed', '1 large carrot, peeled, diced', '2 sticks celery, diced', '2 small zucchini, diced', '1 swede or turnip, peeled, diced', '1 1/4 cups dry soup mix, rinsed', '8 cups Massel chicken style liquid stock', '1kg Coles RSPCA approved free range chicken lovely legs'],
        instructions: 'Heat oil in a large saucepan over medium heat. Add leek and garlic. Cook, stirring, for 2 minutes or until soft but not coloured. Add carrot, celery, zucchini and swede. Cook for 2 minutes. Stir in soup mix, stock, chicken and 1 cup cold water. Increase heat to high. Bring to the boil. Reduce heat to low. Simmer, partially covered, stirring occasionally, for 1 hour or until soup mix and vegetables are tender. Remove chicken legs from soup. Allow to cool slightly. Remove meat from bones. Roughly chop chicken meat and add to soup. Season with salt and pepper. Ladle soup into warmed bowls. Serve.',
        image:'/17.jpg'
    },
    {
        name: 'Crispy-skinned salmon',
        ingredients: ['4 (200g each) salmon fillets, skin on', '2 tbsp olive oil', '1 tsp salt flakes', 'Steamed chat potatoes, to serve', 'Salad leaves, to serve'],
        instructions: 'Place salmon, skin side up, on a plate. Drizzle with oil. Rub salt into skin. Heat a large, non-stick frying pan over medium-high heat. Add salmon, skin side down. Cook for 4 to 5 minutes or until skin is crisp. Turn. Cook, covered for 4 to 5 minutes for medium or until cooked to your liking. Serve with potatoes and salad leaves.',
        image:'/18.jpeg'
    },
    {
        name: 'Beef rissoles',
        ingredients: ['500g Coles beef mince regular', '1 large brown onion, grated', '2 garlic cloves, crushed', '1/2 tsp mixed herbs', '1 egg, lightly beaten', '1/2 cup fresh breadcrumbs', '1 tbsp olive oil', 'Steamed peas, to serve', 'Steamed carrots, to serve', 'Chat potatoes, boiled, to serve', 'Gravy, to serve'],
        instructions: 'Combine mince, onion, garlic, mixed herbs, egg and breadcrumbs in a large bowl. Season with salt and pepper. Using clean hands, shape mixture into eight 2cm-thick rissoles. Place on a large plate. Heat oil in a frying pan over medium-high heat. Add rissoles. Cook for 3 to 4 minutes each side or until cooked through. Serve rissoles with peas, carrot, potatoes and gravy.',
        image:'/19.jpeg'
    },
    {
        name:  'Chicken cacciatore',
        ingredients: ['3 tbsp olive oil', '3 tbsp olive oil\n', '6 Coles RSPCA Approved Chicken Drumsticks, trimmed of excess fat, skin on', '6 chicken thighs, trimmed of excess fat, skin on', '1 large onion, chopped', '2 celery sticks, chopped', '2 carrots, peeled, chopped', '150g sliced pancetta, chopped', '3 garlic cloves, crushed', '125g button mushrooms, sliced', '100ml dry white wine', '2 x Mutti Polpa Finely Chopped Tomatoes 400g', '1/2 tsp brown sugar', '1 tbsp Coles Balsamic Vinegar', '1 tbsp chopped fresh rosemary', '1 bay leaf', '150ml Massel chicken style liquid stock', '1 cup pitted Kalamata olives', 'Chopped flat-leaf parsley, to garnish'],
        instructions: 'Heat the oil in a large casserole dish over medium-high heat. Add the chicken drumsticks and chicken thighs and cook until browned all over. Transfer to a plate and set aside. Add the onion, celery, carrot and pancetta to the pan and cook over low heat for 5 minutes until the onion softens. Add the garlic and mushrooms and cook for a further minute. Return chicken pieces to the pan, add the wine and allow to simmer 1-2 minutes. Add the tomatoes, sugar, vinegar, rosemary, bay leaf and stock. Bring to the boil, then reduce heat to low and cook, covered, for 20 minutes, stirring occasionally. Add the olives and cook for a further 10 minutes.' + 'Transfer chicken to a platter, then reduce the sauce over high heat for 5-6 minutes. After cooking the sauce for 5-6 minutes, pour the sauce over the chicken on the platter. Serve garnished with the parsley.',
        image: '/20.jpg'
    }
];

const Home = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const recipeIndex = Math.floor(Math.random()* allRecipes.length); // Change this index to display a different recipe
        setRecipe(allRecipes[recipeIndex]);
    }, []);

    const handleBMIClick = () => {
        navigate('/bmi');
    };

    const handleAbsClick = () => {
        navigate('/abs');
    }

    const handleChestClick = () => {
        navigate('/chest')
    }

    const handleArmClick=()=>{
        navigate('/arm')
    }

    const handleLegClick = () => {
        navigate('/leg')
    }

    const handleShoulderBackClick = () => {
        navigate('/shoulderback')
    }

    const handleSRGClick = () => {
        navigate('/srg')
    }

    return (
        <>
            <div className='container'>
                <div className='sidebar'>
                    <Sidebar>
                        <Menu>
                            <MenuItem className='item'> Today's recipe </MenuItem>
                            <MenuItem className='item' onClick={handleBMIClick}> BMI Calculator </MenuItem>
                            <SubMenu label='Workouts' className='item'>
                                    <MenuItem className='sub-item' onClick={handleAbsClick}> <span className='text'>Abs</span> </MenuItem>
                                    <MenuItem className='sub-item'> <span className='text' onClick={handleChestClick}>Chest</span> </MenuItem>
                                    <MenuItem className='sub-item'> <span className='text' onClick={handleArmClick}>Arm</span> </MenuItem>
                                    <MenuItem className='sub-item'> <span className='text' onClick={handleLegClick}>Leg</span> </MenuItem>
                                    <MenuItem className='sub-item'> <span className='text' onClick={handleShoulderBackClick}>Shoulder&Back</span></MenuItem>
                            </SubMenu>
                            <MenuItem className='item' onClick={handleSRGClick}>ChatSRG</MenuItem>
                            <MenuItem className='item' onClick={
                                () => {
                                    doSignOut().then(() => {
                                        navigate('/login')
                                    })
                                }}
                            > Sign out </MenuItem>
                        </Menu>
                    </Sidebar>
                </div>
                <div className='recipes'>
                    {recipe && (
                        <div className='recipe'>
                            <h1 className='recipe-name'>Today's healthy recipe: {recipe.name}</h1>
                            <div className='recipe-details'>
                                <div className='ingredients'>
                                    <h2>Ingredients:</h2>
                                    <p>{recipe.ingredients.join('; ')}</p>
                                </div>
                                <div className='instructions'>
                                    <h2>Instructions:</h2>
                                    <p>{recipe.instructions}</p>
                                </div>
                            </div>
                            <div className='recipe-img-container'>
                                <img src={recipe.image} className='recipe-img' alt={recipe.name} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Home