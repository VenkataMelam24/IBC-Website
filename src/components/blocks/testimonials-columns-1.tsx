"use client";
import React from "react";
import { motion } from "motion/react";

type Testimonial = {
  text: string;
  name: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Raju SVP",
    text: "Best biryani I've had in Berlin so far. As someone from Hyderabad, I'm usually very critical when it comes to biryani. The rice was perfectly cooked, the spices were well balanced, and the aroma reminded me of proper Hyderabadi dum biryani. Definitely worth trying.",
  },
  {
    name: "Praveen Makireddy",
    text: "I had a wonderful experience. The ambiance was warm and inviting, with just the right balance of comfort and elegance. The food was absolutely outstanding — every dish was fresh, beautifully presented, and full of flavor. I especially loved the Mutton Biryani. Definitely a place I'll be returning to again.",
  },
  {
    name: "Rajat Shinde",
    text: "Absolute gem place for eating delicious authentic flavour Indian food. The Chicken Biryani did not disappoint at all — actual biryani, not just rice with spices. The ambience is good and quiet. Definitely worth multiple visits.",
  },
  {
    name: "Subhalaxmi Mahanta",
    text: "We were a group of 4 and tried mutton and chicken biriyani. Both the biriyani taste so good and authentic. Give it a try!",
  },
  {
    name: "Sobhana Penneru",
    text: "The crispy prawn made me feel like 'why haven't I visited before?' The biryani was perfect, filled with flavour and meat was falling off the bone.",
  },
  {
    name: "Srinivas Jayarama",
    text: "Best biryani day for me. Being a vegetarian, I asked for a special veg biryani and boy was it good. There's a version for people who can't take spice and a version for people who want to remember home. Today I experienced the latter. Loved it, will visit again for sure.",
  },
  {
    name: "Manmohan Regunta",
    text: "If you're hunting for authentic Indian flavour in the Hyderabadi Dum Biryani, this is the place. The chefs did not compromise to deliver the original taste of dum biryani right on your table. This will be the only go-to place for authentic Indian dum biryani.",
  },
  {
    name: "Marta Font Garcia",
    text: "My Indian boyfriend wanted to try the Biryani and we loved it! Super tasty and aromatic. We also tried the Chicken Curry and Paratha — also really tasty. They were really attentive and fast. I recommend it 100%.",
  },
  {
    name: "Aleks Aleks",
    text: "Top location, top biryani, and definitely one of the kindest owners that this planet has ever seen! Hosted a whole event there — went great, and we will for sure be back!",
  },
  {
    name: "Pavneet Soni",
    text: "Very happy with our decision to come to Berlin only to try their food. We tried their chilly chicken and Chicken Biryani and loved it. Rarely do we get typical Indian spice level and flavours at Indian restaurants in Germany. Chai was delicious.",
  },
  {
    name: "Claire Gilmore",
    text: "Best chicken biryani! We enjoyed a delicious dinner here. The butter chicken and butter naan were also amazing! Highly recommend this neighbourhood restaurant.",
  },
  {
    name: "Vaishnavi Bandike",
    text: "I loved chilli chicken — it's 10/10. And we also ordered mutton biryani, it's delicious. I felt the pure Indian fresh grind spice taste here. Malai chicken tikka as a complimentary — even fantastic.",
  },
  {
    name: "Carol Pereira",
    text: "Excellent place for authentic biriyani and a satisfying lunch. The biriyani is flavorful, aromatic, and prepared with genuine traditional taste. Great portions, good service, and a pleasant dining atmosphere. Highly recommended.",
  },
  {
    name: "Rajita Maitra",
    text: "I recently visited this place. I had chicken biryani and mango lassi and the taste was too good. I really liked the cleanliness and the staff behaviour. They were really good.",
  },
];

const firstColumn = testimonials.slice(0, 5);
const secondColumn = testimonials.slice(5, 10);
const thirdColumn = testimonials.slice(10, 14);

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 15,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-4 pb-4"
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, name }, i) => (
              <div
                key={i}
                className="rounded-2xl border border-primary/15 bg-primary p-5 shadow-lg"
              >
                <div className="flex gap-0.5 text-accent text-sm mb-3">
                  {[...Array(5)].map((_, j) => <span key={j}>★</span>)}
                </div>
                <p className="text-sm leading-relaxed text-primary-foreground/85">&ldquo;{text}&rdquo;</p>
                <div className="mt-4 border-t border-primary-foreground/15 pt-3">
                  <p className="text-sm font-semibold text-primary-foreground">{name}</p>
                  <p className="text-xs text-primary-foreground/50">via Google</p>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </motion.div>
    </div>
  );
};

export const Testimonials = () => {
  return (
    <section className="border-t border-border bg-primary py-14 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <h2 className="font-heading text-3xl font-bold leading-[1.35] text-primary-foreground md:text-5xl">
              What Our Guests Say.
            </h2>
            <div className="mt-3 h-1 w-20 bg-accent" />
            <p className="mt-5 text-base leading-relaxed text-primary-foreground/75">
              Real reviews from real guests.
            </p>
          </div>

          {/* Rating badge */}
          <div className="flex flex-col items-center rounded-xl bg-primary-foreground/10 px-5 py-4 ring-1 ring-primary-foreground/20">
            <p className="font-heading text-3xl font-bold text-primary-foreground">4.9</p>
            <div className="mt-1 flex gap-0.5 text-base text-accent">
              <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
            </div>
            <p className="mt-1.5 text-xs font-semibold text-primary-foreground">251 ratings</p>
            <p className="text-xs text-primary-foreground/60">on Google</p>
          </div>
        </div>

        {/* Scrolling columns */}
        <div className="mt-12 flex max-h-[520px] items-start justify-center gap-4 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
          <TestimonialsColumn testimonials={firstColumn} duration={22} className="w-full max-w-sm" />
          <TestimonialsColumn testimonials={secondColumn} duration={27} className="hidden w-full max-w-sm md:block" />
          <TestimonialsColumn testimonials={thirdColumn} duration={20} className="hidden w-full max-w-sm lg:block" />
        </div>
      </div>
    </section>
  );
};
