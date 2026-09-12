import React from 'react';
import { PageContainer } from '../PageContainer';
import { useWorkbook } from '../../context/WorkbookContext';
import { Apple, ShoppingCart, Coffee, Utensils, Droplets, CheckCircle2, ArrowRight, ShieldCheck, DollarSign } from 'lucide-react';

interface PartThreeProps {
  onJumpToPage: (page: number) => void;
}

// Page 29: Student Nutrition Reality
export const Page29NutritionReality: React.FC = () => {
  return (
    <PageContainer
      pageNumber={29}
      partTitle="PART THREE — FUEL"
      category="Teaching"
      title="Student Nutrition Reality"
      subtitle="No luxury superfoods, no calorie obsession, zero starvation"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 text-xs text-gray-700 leading-relaxed">
        <div className="p-3.5 bg-[#F7F8F3] border-l-4 border-[#F4C95D] rounded-r-xl">
          <p className="font-semibold text-[#14213D] text-xs">
            "You do not need $18 organic acai bowls or gourmet meal deliveries to be healthy at university."
          </p>
          <p className="text-gray-600 text-[11px] mt-0.5">
            The wellness industry often tries to sell expensive, unrealistic diets. Real student nutrition is about simple, budget-friendly groceries that keep your brain energized through 3-hour study blocks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-1.5">
            <h4 className="font-bold text-[#14213D] text-xs uppercase text-[#38B66B]">Rule 1: Protein at Every Main Meal</h4>
            <p className="text-gray-600 text-[11px]">
              Eggs, canned tuna, Greek yogurt, chicken breast, chickpeas, or tofu. Protein stabilizes your blood sugar, prevents 3 PM study crashes, and repairs muscle tissue.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-1.5">
            <h4 className="font-bold text-[#14213D] text-xs uppercase text-[#38B66B]">Rule 2: Don't Drink Your Daily Calories</h4>
            <p className="text-gray-600 text-[11px]">
              Caramel frappes and sugary sodas dump 40g–60g of refined sugar straight into your bloodstream, leading to an immediate energy collapse. Switch to water, black coffee, or green tea.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-1.5">
            <h4 className="font-bold text-[#14213D] text-xs uppercase text-[#38B66B]">Rule 3: Frozen Veggies Are a Superpower</h4>
            <p className="text-gray-600 text-[11px]">
              Fresh produce often rots in student mini-fridges. Bags of frozen broccoli, spinach, and peas are cheaper, pre-washed, flash-frozen at peak nutrients, and cook in 3 minutes.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-1.5">
            <h4 className="font-bold text-[#14213D] text-xs uppercase text-[#38B66B]">Rule 4: The 80 / 20 Student Principle</h4>
            <p className="text-gray-600 text-[11px]">
              80% nutrient-dense fuel (protein, grains, veggies). 20% social flexibility (pizza with roommates, late-night campus fries). Guilt has zero nutritional value.
            </p>
          </div>
        </div>

        <div className="p-3 bg-[#14213D] text-white rounded-xl text-center">
          <p className="text-xs font-semibold text-[#F4C95D]">
            Simple Standard: Eat like an adult who respects their brain and body.
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 30: Student Meal Formula Graphic (Visual Element #12)
export const Page30StudentMealFormula: React.FC = () => {
  return (
    <PageContainer
      pageNumber={30}
      partTitle="PART THREE — FUEL"
      category="Visual Concept"
      title="Student Meal Formula Graphic"
      subtitle="Protein + Slow Carb + Colorful Fiber + Good Fat (Visual Element #12)"
      badge="Visual Element #12"
    >
      <div className="flex-1 flex flex-col justify-between space-y-3.5 text-xs">
        <p className="text-gray-600">
          Whenever you assemble a plate at your dorm, kitchen, or campus dining hall, divide it visually into these four essential quadrants:
        </p>

        {/* Visual Plate Diagram */}
        <div className="p-4 bg-[#F7F8F3] border border-[#E5E7EB] rounded-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Quadrant 1: Protein */}
            <div className="p-3.5 bg-white border-2 border-[#38B66B]/50 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[#14213D] text-xs uppercase">1. Lean Protein (1 Palm)</span>
                <span className="text-[10px] font-bold text-white bg-[#38B66B] px-2 py-0.5 rounded">25–35g</span>
              </div>
              <p className="text-[11px] text-gray-600">Eggs (2–3), Canned Tuna, Greek Yogurt, Chicken Breast, Tofu, Lentils, or Cottage Cheese.</p>
              <p className="text-[10px] text-gray-400 italic">Keeps you full for 4 hours and protects muscle.</p>
            </div>

            {/* Quadrant 2: Slow Carbs */}
            <div className="p-3.5 bg-white border-2 border-[#F4C95D]/60 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[#14213D] text-xs uppercase">2. Slow Carbs (1 Cupped Hand)</span>
                <span className="text-[10px] font-bold text-[#14213D] bg-[#F4C95D] px-2 py-0.5 rounded">Steady Energy</span>
              </div>
              <p className="text-[11px] text-gray-600">Oats, Brown/White Rice, Potatoes, Sweet Potatoes, Wholewheat Toast, or Quinoa.</p>
              <p className="text-[10px] text-gray-400 italic">Fuels study focus without blood sugar spikes.</p>
            </div>

            {/* Quadrant 3: Color / Fiber */}
            <div className="p-3.5 bg-white border-2 border-[#38B66B]/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[#14213D] text-xs uppercase">3. Color & Fiber (1–2 Fists)</span>
                <span className="text-[10px] font-bold text-[#38B66B] bg-[#38B66B]/15 px-2 py-0.5 rounded">Vitamins</span>
              </div>
              <p className="text-[11px] text-gray-600">Spinach, Broccoli, Bell Peppers, Carrots, Frozen Mixed Veg, Tomatoes, or Apples.</p>
              <p className="text-[10px] text-gray-400 italic">Supports digestion, immunity, and brain health.</p>
            </div>

            {/* Quadrant 4: Healthy Fat */}
            <div className="p-3.5 bg-white border-2 border-[#14213D]/30 rounded-xl space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-[#14213D] text-xs uppercase">4. Healthy Fat (1 Thumb)</span>
                <span className="text-[10px] font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">Hormones</span>
              </div>
              <p className="text-[11px] text-gray-600">Olive Oil (1 tbsp), Peanut Butter, Handful of Almonds, Cheese, or Half Avocado.</p>
              <p className="text-[10px] text-gray-400 italic">Crucial for brain function and fat-soluble vitamins.</p>
            </div>
          </div>
        </div>

        <div className="p-2.5 bg-white border border-[#E5E7EB] rounded-xl flex items-center justify-between text-xs text-gray-600">
          <span>Hand-Size Guide: Palm = Protein • Fist = Veg • Cupped Hand = Carbs • Thumb = Fat</span>
          <span className="font-bold text-[#38B66B]">Zero Food Scales Required</span>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 31: Grocery Checklist (Visual Element #13)
export const Page31GroceryChecklist: React.FC = () => {
  const { state, toggleGroceryItem } = useWorkbook();
  const checked = state.mealPlanner.groceryChecklist;

  const categories = [
    {
      title: 'Proteins (Budget Heroes)',
      items: [
        { id: 'eggs', label: 'Carton of Eggs (12–18 count)' },
        { id: 'tuna', label: 'Canned Tuna in water (3–4 cans)' },
        { id: 'yogurt', label: 'Plain Greek Yogurt (500g/1kg tub)' },
        { id: 'beans', label: 'Canned Black Beans or Chickpeas' },
        { id: 'chicken', label: 'Chicken breast or ground turkey' },
      ],
    },
    {
      title: 'Complex Carbs',
      items: [
        { id: 'oats', label: 'Rolled Oats (big budget bag)' },
        { id: 'rice', label: 'Jasmine or Brown Rice (1kg bag)' },
        { id: 'toast', label: 'Wholewheat Bread (freeze half)' },
        { id: 'potatoes', label: 'Bag of Potatoes or Sweet Potatoes' },
      ],
    },
    {
      title: 'Produce & Frozen Greens',
      items: [
        { id: 'frozen_veg', label: 'Frozen Broccoli or Peas (cheapest)' },
        { id: 'spinach', label: 'Fresh Baby Spinach (add to everything)' },
        { id: 'bananas', label: 'Bananas & Apples (portable study fuel)' },
        { id: 'onions_garlic', label: 'Bag of Onions & Garlic' },
      ],
    },
    {
      title: 'Healthy Fats & Dorm Flavor',
      items: [
        { id: 'peanut_butter', label: 'Natural Peanut Butter' },
        { id: 'olive_oil', label: 'Extra Virgin Olive Oil' },
        { id: 'hot_sauce', label: 'Hot Sauce / Soy Sauce / Garlic Powder' },
        { id: 'cheese', label: 'Cheddar or Mozzarella block' },
      ],
    },
  ];

  return (
    <PageContainer
      pageNumber={31}
      partTitle="PART THREE — FUEL"
      category="Checklist"
      title="Grocery Checklist"
      subtitle="The $35–$45 Master Student Grocery List (Visual Element #13)"
      badge="Visual Element #13"
    >
      <div className="flex-1 flex flex-col justify-between space-y-3 text-xs">
        <div className="flex items-center justify-between p-2.5 bg-[#38B66B]/15 border border-[#38B66B]/30 rounded-xl">
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-[#38B66B]" />
            <span className="font-bold text-[#14213D] text-xs">Estimated Weekly Total: $35 – $45</span>
          </div>
          <span className="text-[11px] text-gray-600">Feeds 1 student for 5–7 days</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto max-h-[580px] pr-1">
          {categories.map((cat) => (
            <div key={cat.title} className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-2">
              <h4 className="font-bold text-[#14213D] text-xs uppercase tracking-wide border-b border-[#ECEEE7] pb-1">
                {cat.title}
              </h4>
              <div className="space-y-1.5">
                {cat.items.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2.5 cursor-pointer text-[11px] text-gray-700 hover:text-[#14213D]"
                  >
                    <input
                      type="checkbox"
                      checked={!!checked[item.id]}
                      onChange={() => toggleGroceryItem(item.id)}
                      className="w-3.5 h-3.5 rounded text-[#38B66B] accent-[#38B66B]"
                    />
                    <span className={checked[item.id] ? 'line-through text-gray-400' : ''}>
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-2.5 bg-[#F7F8F3] border border-[#E5E7EB] rounded-xl flex justify-between items-center text-[11px] text-gray-500">
          <span>Items Checked: {Object.values(checked).filter(Boolean).length} / 17</span>
          <span className="font-semibold text-[#14213D]">Never grocery shop while hungry!</span>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 32: 15-Minute Dorm Cooking
export const Page32DormCookingRecipes: React.FC = () => {
  const recipes = [
    {
      title: '1. The 5-Minute Tuna Rice Power Bowl',
      time: '5 Mins',
      cost: '$1.80',
      ingredients: '1 can tuna drained, 1 cup microwave brown/white rice, 1 cup baby spinach, splash of soy sauce, 1 tsp sesame/olive oil, hot sauce.',
      instructions: 'Microwave rice for 90 seconds. Stir in spinach so it wilts slightly. Top with drained tuna, drizzle soy sauce and hot sauce. Mix thoroughly.',
    },
    {
      title: '2. The 10-Minute High-Protein Scramble & Toast',
      time: '8 Mins',
      cost: '$1.50',
      ingredients: '3 whole eggs, handful of spinach, slice of cheddar cheese, 2 slices wholewheat toast.',
      instructions: 'Whisk eggs in a bowl. Heat pan on medium, toss in spinach for 60s, pour eggs, scramble gently for 2 mins. Melt cheese on top. Serve with toast.',
    },
    {
      title: '3. Black Bean & Salsa Burrito Bowl',
      time: '6 Mins',
      cost: '$1.95',
      ingredients: '1/2 can black beans rinsed, 1 cup microwave rice, 2 tbsp jarred salsa, 2 tbsp Greek yogurt (acts as sour cream), grated cheese.',
      instructions: 'Warm beans and rice together in microwave for 2 mins. Top with salsa, a spoonful of cool Greek yogurt, and a sprinkle of cheese.',
    },
    {
      title: '4. Desk-Ready Greek Yogurt & Berry Crunch',
      time: '3 Mins',
      cost: '$1.40',
      ingredients: '1 cup plain Greek yogurt, 1/3 cup dry rolled oats or granola, 1 sliced banana or handful of frozen berries, 1 tbsp peanut butter.',
      instructions: 'Layer yogurt into a bowl or travel mug. Top with fruit, oats, and peanut butter. High protein, zero cooking, ready before 9 AM class.',
    },
  ];

  return (
    <PageContainer
      pageNumber={32}
      partTitle="PART THREE — FUEL"
      category="Teaching & Recipes"
      title="15-Minute Dorm Cooking"
      subtitle="4 budget meals that require minimal clean-up and zero chef skills"
    >
      <div className="flex-1 flex flex-col justify-between space-y-3 text-xs text-gray-700">
        <p>
          You don’t need an oven or 10 ingredients. These recipes use 1 pan or a single bowl, cost under $2 each, and take less time than ordering food delivery.
        </p>

        <div className="space-y-2.5 overflow-y-auto max-h-[620px] pr-1">
          {recipes.map((r) => (
            <div key={r.title} className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-[#14213D] text-xs uppercase">{r.title}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold bg-[#38B66B]/15 text-[#38B66B] px-2 py-0.5 rounded">
                    {r.time}
                  </span>
                  <span className="text-[10px] font-semibold bg-[#F4C95D]/30 text-[#B88716] px-2 py-0.5 rounded">
                    {r.cost}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-gray-600"><strong>Ingredients:</strong> {r.ingredients}</p>
              <p className="text-[11px] text-gray-700"><strong>How:</strong> {r.instructions}</p>
            </div>
          ))}
        </div>

        <div className="p-2.5 bg-[#F7F8F3] border border-[#E5E7EB] rounded-xl text-[11px] text-center text-gray-500">
          Clean-up Hack: Wash your 1 pan immediately after dishing up food while the pan is still warm. Takes 30 seconds.
        </div>
      </div>
    </PageContainer>
  );
};

// Page 33: Dining Hall & Canteen Navigator
export const Page33DiningHallNavigator: React.FC = () => {
  return (
    <PageContainer
      pageNumber={33}
      partTitle="PART THREE — FUEL"
      category="Teaching"
      title="Dining Hall Survival Guide"
      subtitle="Navigating campus meal plans, buffets & canteens with high energy"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 text-xs text-gray-700 leading-relaxed">
        <p>
          University dining halls can be a trap of endless soft-serve ice cream, fried chicken tenders, and refined carbs. But they can also be the cheapest high-protein buffet in the world if you know the route.
        </p>

        <div className="space-y-3">
          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase tracking-wider">Step 1: The Protein Station First</span>
            <h4 className="font-bold text-[#14213D] text-xs">Anchor Your Plate</h4>
            <p className="text-gray-600 text-[11px]">
              Head directly to the grill or carvery station. Ask for grilled chicken breast, baked fish, eggs, tofu, or lean beef. If the portion is small, politely ask for a double scoop.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase tracking-wider">Step 2: The Salad Bar Bulk</span>
            <h4 className="font-bold text-[#14213D] text-xs">Fill Half the Tray with Color</h4>
            <p className="text-gray-600 text-[11px]">
              Load up on leafy greens, cucumbers, carrots, and cherry tomatoes. Use vinaigrette or olive oil rather than heavy mayonnaise-based ranch dressings.
            </p>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-[#38B66B] uppercase tracking-wider">Step 3: Smart Starch</span>
            <h4 className="font-bold text-[#14213D] text-xs">Pick Potatoes, Rice or Quinoa</h4>
            <p className="text-gray-600 text-[11px]">
              Opt for plain baked potato, roasted sweet potatoes, or steamed rice rather than deep-fried french fries every single meal.
            </p>
          </div>
        </div>

        <div className="p-3.5 bg-[#14213D] text-white rounded-xl">
          <p className="text-xs font-bold text-[#F4C95D] uppercase mb-0.5">The Soft-Serve Hack:</p>
          <p className="text-xs text-gray-200">
            Don't ban desserts completely. Enjoy the dessert bar 1–2 times a week after a hard workout or on Friday dinner, rather than mindlessly eating dessert 3 times a day.
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 34: Takeout & Fast-Food Navigator
export const Page34TakeoutNavigator: React.FC = () => {
  return (
    <PageContainer
      pageNumber={34}
      partTitle="PART THREE — FUEL"
      category="Teaching"
      title="The Takeout & Fast-Food Navigator"
      subtitle="Realistic damage control when studying late or ordering with friends"
    >
      <div className="flex-1 flex flex-col justify-between space-y-3.5 text-xs text-gray-700 leading-relaxed">
        <p>
          You don’t need to stay home when your friends order takeout at 10 PM. Use this master menu navigator to make high-protein, smart choices at popular student spots:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <h4 className="font-bold text-[#14213D] text-xs uppercase">Burrito Spots / Chipotle</h4>
            <p className="text-[11px] text-gray-600"><strong>Best Order:</strong> Burrito Bowl (skip the giant 300-cal tortilla). Brown rice, black beans, chicken or steak, fajita veggies, fresh tomato salsa, lettuce. Go light on sour cream.</p>
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <h4 className="font-bold text-[#14213D] text-xs uppercase">Subway & Sandwich Delis</h4>
            <p className="text-[11px] text-gray-600"><strong>Best Order:</strong> 6-inch wholewheat or wrap. Double turkey, chicken breast, or tuna. Pack with all veggies (spinach, peppers, onions). Choose mustard or sweet onion sauce over mayo.</p>
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <h4 className="font-bold text-[#14213D] text-xs uppercase">Burger Joints</h4>
            <p className="text-[11px] text-gray-600"><strong>Best Order:</strong> Single or double hamburger without bacon-mayo sauce. Swap large fries for side salad, apple slices, or share a small fries with a friend.</p>
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl space-y-1">
            <h4 className="font-bold text-[#14213D] text-xs uppercase">Pizza Nights with Roommates</h4>
            <p className="text-[11px] text-gray-600"><strong>Strategy:</strong> Drink 500ml water and eat a handful of baby carrots or side salad first. Enjoy 2–3 slices mindfully, then put the box away instead of mindlessly eating 6 slices.</p>
          </div>
        </div>

        <div className="p-3 bg-[#38B66B]/15 border border-[#38B66B]/30 rounded-xl text-center font-semibold text-[#14213D] text-[11px]">
          Remember: One single takeout meal will not ruin your 30-day progress. Just resume the baseline the next morning.
        </div>
      </div>
    </PageContainer>
  );
};

// Page 35: Hydration & Caffeine Protocol
export const Page35HydrationCaffeine: React.FC = () => {
  return (
    <PageContainer
      pageNumber={35}
      partTitle="PART THREE — FUEL"
      category="Visual Guide"
      title="Hydration & The Caffeine Protocol"
      subtitle="Ending the 3 PM study crash & mastering your daily energy curve"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 text-xs text-gray-700 leading-relaxed">
        <p>
          Over 75% of student "fatigue" is simply mild dehydration and caffeine withdrawal. When you master your daily fluid timing, mental sharpness doubles.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-[#38B66B]">
              <Droplets className="w-5 h-5" />
              <h4 className="font-bold text-[#14213D] text-xs uppercase">The Hydration Blueprint</h4>
            </div>
            <ul className="space-y-1.5 text-[11px] text-gray-600">
              <li>• <strong>Morning Flush:</strong> Drink 500ml water immediately upon waking (your brain loses 1L of water overnight).</li>
              <li>• <strong>The Backpack Rule:</strong> Carry a 750ml–1L reusable water bottle in your backpack to every lecture.</li>
              <li>• <strong>Target:</strong> Finish 2 full bottles before 4 PM.</li>
            </ul>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-[#B88716]">
              <Coffee className="w-5 h-5" />
              <h4 className="font-bold text-[#14213D] text-xs uppercase">The Caffeine Curfew (2:00 PM)</h4>
            </div>
            <ul className="space-y-1.5 text-[11px] text-gray-600">
              <li>• <strong>Delay 60 Mins:</strong> Wait 60–90 mins after waking before your first coffee. Allows natural cortisol to clear adenosine.</li>
              <li>• <strong>Hard Curfew:</strong> Zero caffeine after 2:00 PM. Caffeine has a 6-hour half-life and prevents deep restorative delta sleep.</li>
              <li>• <strong>Cap It:</strong> Limit to 200–300mg (1–2 cups) daily.</li>
            </ul>
          </div>
        </div>

        <div className="p-3.5 bg-[#F7F8F3] border border-[#E5E7EB] rounded-xl">
          <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1">The Midday Lethargy Cure:</h4>
          <p className="text-[11px] text-gray-600">
            When you hit that 3 PM library wall: do NOT grab an energy drink. Stand up, drink 500ml of cold water, step outside for 5 minutes of sunlight and brisk movement. It restores alertness without ruining sleep.
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 36: Alcohol & Social Balance
export const Page36AlcoholSocialBalance: React.FC = () => {
  return (
    <PageContainer
      pageNumber={36}
      partTitle="PART THREE — FUEL"
      category="Teaching"
      title="Alcohol & Social Life Balance"
      subtitle="Staying healthy and fit without becoming a campus recluse"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 text-xs text-gray-700 leading-relaxed">
        <p>
          University is a social experience. We are not here to tell you that you can never drink or go out with friends. But alcohol heavily degrades sleep architecture, dehydrates muscle tissue, and drives late-night junk food cravings.
        </p>

        <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-2">
          <h4 className="font-bold text-[#14213D] text-xs uppercase text-[#38B66B]">The "Fit Student Night-Out" Playbook</h4>
          <div className="space-y-2 text-[11px] text-gray-600">
            <p><strong>1. The Water Sandwich:</strong> For every alcoholic drink you consume at a pub or party, drink 1 full glass of water. Cuts hangovers by 70% and naturally slows consumption pace.</p>
            <p><strong>2. Smart Swaps:</strong> Choose vodka/gin with soda water & lime or light beers instead of high-sugar mixed cocktails and sugary syrup shots.</p>
            <p><strong>3. Eat a High-Protein Meal BEFORE Going Out:</strong> Never drink on an empty stomach. A chicken and rice bowl or egg scramble before leaving prevents drunk 2 AM pizza binging.</p>
            <p><strong>4. The Nightstand Rehydration Station:</strong> Place a 1-liter water bottle and pinch of salt on your nightstand before leaving your dorm.</p>
          </div>
        </div>

        <div className="p-3 bg-[#F7F8F3] border border-[#ECEEE7] rounded-xl text-center">
          <p className="text-xs font-semibold text-[#14213D]">
            The Day-After Rule: Never stay in bed all Sunday scrolling. Go for a 20-minute fresh air walk, rehydrate, and resume normal eating.
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 37: Weekly Meal Planner (Visual Element #14)
export const Page37WeeklyMealPlanner: React.FC = () => {
  const { state, updateMealPlanner } = useWorkbook();
  const planned = state.mealPlanner.plannedMeals;

  const days = [
    { key: 'mon', label: 'Mon' },
    { key: 'tue', label: 'Tue' },
    { key: 'wed', label: 'Wed' },
    { key: 'thu', label: 'Thu' },
    { key: 'fri', label: 'Fri' },
    { key: 'sat', label: 'Sat' },
    { key: 'sun', label: 'Sun' },
  ];

  const handleMealChange = (dayKey: string, field: 'lunch' | 'dinner' | 'snack', val: string) => {
    updateMealPlanner({
      plannedMeals: {
        ...planned,
        [dayKey]: {
          ...(planned[dayKey] || { day: dayKey, lunch: '', dinner: '', snack: '' }),
          [field]: val,
        },
      },
    });
  };

  return (
    <PageContainer
      pageNumber={37}
      partTitle="PART THREE — FUEL"
      category="Planner"
      title="Weekly Meal Planner"
      subtitle="Map quick lunches, simple dinners & snacks (Visual Element #14)"
      badge="Visual Element #14"
    >
      <div className="flex-1 flex flex-col justify-between space-y-3 text-xs">
        <p className="text-[11px] text-gray-600">
          Deciding what to eat when you are already starving at 7 PM leads to delivery apps. Plan simple anchor meals below:
        </p>

        <div className="space-y-2 overflow-y-auto max-h-[620px] pr-1">
          {days.map(({ key, label }) => {
            const item = planned[key] || { day: label, lunch: '', dinner: '', snack: '' };
            return (
              <div key={key} className="p-2.5 bg-white border border-[#E5E7EB] rounded-xl flex flex-col sm:flex-row sm:items-center gap-2">
                <span className="w-12 font-extrabold text-[#14213D] text-xs uppercase">{label}</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 flex-1">
                  <input
                    type="text"
                    placeholder="Lunch (e.g. Tuna rice bowl)"
                    value={item.lunch}
                    onChange={(e) => handleMealChange(key, 'lunch', e.target.value)}
                    className="bg-[#F7F8F3] border border-[#E5E7EB] rounded-md px-2 py-1 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Dinner (e.g. Scramble & salad)"
                    value={item.dinner}
                    onChange={(e) => handleMealChange(key, 'dinner', e.target.value)}
                    className="bg-[#F7F8F3] border border-[#E5E7EB] rounded-md px-2 py-1 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Snack (e.g. Apple & PB)"
                    value={item.snack}
                    onChange={(e) => handleMealChange(key, 'snack', e.target.value)}
                    className="bg-[#F7F8F3] border border-[#E5E7EB] rounded-md px-2 py-1 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-2.5 bg-[#F7F8F3] border border-[#E5E7EB] rounded-xl flex items-center justify-between text-[11px] text-gray-500">
          <span>Target Budget: ${state.mealPlanner.budgetPerWeek || '40'} / week</span>
          <span className="font-semibold text-[#38B66B]">Cook 2x portions = Instant lunch for tomorrow</span>
        </div>
      </div>
    </PageContainer>
  );
};

// Page 38: Dorm Kitchen & Batch Prep Worksheet
export const Page38DormKitchenBatchPrep: React.FC = () => {
  const { state, updateMealPlanner } = useWorkbook();

  return (
    <PageContainer
      pageNumber={38}
      partTitle="PART THREE — FUEL"
      category="Worksheet"
      title="Dorm Kitchen & Batch Prep Worksheet"
      subtitle="45-Minute Sunday Power Prep for a stress-free week"
    >
      <div className="flex-1 flex flex-col justify-between space-y-3.5 text-xs text-gray-700">
        <p>
          You don't need 4 hours of Sunday food prep. A 45-minute power prep session gives you ready-to-grab carbs and proteins so you never scramble on weeknights.
        </p>

        <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl space-y-2">
          <h4 className="font-bold text-[#14213D] text-xs uppercase">The 45-Minute Sunday Flow</h4>
          <div className="space-y-1.5 text-[11px] text-gray-600">
            <p><strong>Min 0–10:</strong> Start 4 cups of rice in pot/cooker OR boil 6 whole eggs in a saucepan.</p>
            <p><strong>Min 10–25:</strong> Bake chicken breast / tofu on a single sheet tray OR brown ground meat in pan with taco seasoning.</p>
            <p><strong>Min 25–35:</strong> Wash and chop apples or celery; portion peanut butter into small tubs.</p>
            <p><strong>Min 35–45:</strong> Divide into 4 glass containers, label with tape, and stack in dorm fridge.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
              Designated Weekly Batch Prep Window:
            </label>
            <input
              type="text"
              placeholder="e.g., Sunday 4:00 PM – 5:00 PM"
              value={state.mealPlanner.batchCookDay}
              onChange={(e) => updateMealPlanner({ batchCookDay: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>

          <div className="p-3 bg-white border border-[#E5E7EB] rounded-xl">
            <label className="block text-[11px] font-bold text-[#14213D] uppercase mb-1">
              Estimated Weekly Food Budget ($):
            </label>
            <input
              type="text"
              placeholder="e.g., 40"
              value={state.mealPlanner.budgetPerWeek}
              onChange={(e) => updateMealPlanner({ budgetPerWeek: e.target.value })}
              className="w-full bg-[#F7F8F3] border border-[#E5E7EB] rounded-lg px-2.5 py-1.5 text-xs text-[#14213D] focus:border-[#38B66B] focus:outline-none"
            />
          </div>
        </div>

        <div className="p-3 bg-[#38B66B]/15 border border-[#38B66B]/30 rounded-xl text-center text-[11px] font-semibold text-[#14213D]">
          "Failing to plan is planning to eat $18 takeout every evening."
        </div>
      </div>
    </PageContainer>
  );
};

// Page 39: Fuel Action Plan & Quick Wins
export const Page39FuelActionPlan: React.FC<PartThreeProps> = ({ onJumpToPage }) => {
  return (
    <PageContainer
      pageNumber={39}
      partTitle="PART THREE — FUEL"
      category="Action Plan"
      title="Fuel Action Plan & Quick Wins"
      subtitle="What to do next before entering Part Four (Habits)"
    >
      <div className="flex-1 flex flex-col justify-between space-y-4 text-xs">
        <div className="p-3.5 bg-[#38B66B]/15 border border-[#38B66B]/30 rounded-xl">
          <h4 className="font-bold text-[#14213D] text-xs uppercase mb-1">
            Part Three Fuel Action Protocol:
          </h4>
          <p className="text-gray-700 text-[11px]">
            You have the student meal formula, the master grocery list, and 15-minute dorm recipes. Here are your 3 immediate nutrition moves:
          </p>
        </div>

        <div className="space-y-3">
          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#14213D] text-white flex items-center justify-center font-bold text-xs shrink-0">
              1
            </span>
            <div>
              <h4 className="font-bold text-[#14213D] text-xs uppercase">Restock 3 Master Staples Today</h4>
              <p className="text-gray-600 text-[11px] mt-0.5">
                Hit the grocery store or campus market: buy a carton of eggs, a bag of oats, and 2 cans of black beans or tuna. Cost: less than $8.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#14213D] text-white flex items-center justify-center font-bold text-xs shrink-0">
              2
            </span>
            <div>
              <h4 className="font-bold text-[#14213D] text-xs uppercase">Enforce the 2 PM Caffeine Curfew</h4>
              <p className="text-gray-600 text-[11px] mt-0.5">
                Switch to water, herbal tea, or decaf after 2 PM tomorrow. Notice how much more deeply you sleep and how refreshed you wake up.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-white border border-[#E5E7EB] rounded-xl flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#14213D] text-white flex items-center justify-center font-bold text-xs shrink-0">
              3
            </span>
            <div>
              <h4 className="font-bold text-[#14213D] text-xs uppercase">Pack a Backpack Snack for Tomorrow's Classes</h4>
              <p className="text-gray-600 text-[11px] mt-0.5">
                Toss an apple, banana, or bag of peanuts in your bag right now so you bypass campus vending machines when 3 PM hunger strikes.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-[#14213D] text-white rounded-xl flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-[#F4C95D] uppercase">What to do next:</h4>
            <p className="text-xs text-gray-200">Unlock Part Four: Habit Stacking, Environment Resets & Sleep Recovery.</p>
          </div>
          <button
            onClick={() => onJumpToPage(40)}
            className="no-print bg-[#38B66B] hover:bg-[#2fa35e] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>Enter Part Four</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </PageContainer>
  );
};
