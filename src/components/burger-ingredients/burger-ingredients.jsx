import { useState, useMemo, useEffect } from "react";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { IngredientsCategory } from "../ingredients-category/ingredients-category";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";

export const BurgerIngredients = () => {
  const data = useSelector((state) => state.burgerIngredients.data);

  const [current, setCurrent] = useState("bun");
  const [bunsRef, inViewBuns] = useInView({
    threshold: 0,
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0,
  });
  const [saucesRef, inViewSauces] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrent("bun");
    } else if (inViewSauces) {
      setCurrent("sauce");
    } else if (inViewFilling) {
      setCurrent("main");
    }
  }, [inViewBuns, inViewSauces, inViewFilling]);

  const ingredientsGroups = useMemo(() => {
    const buns = {
      data: data.filter((item) => item.type === "bun"),
      ref: bunsRef,
    };
    const mains = {
      data: data.filter((item) => item.type === "main"),
      ref: mainsRef,
    };
    const sauces = {
      data: data.filter((item) => item.type === "sauce"),
      ref: saucesRef,
    };

    return [buns, sauces, mains];
  }, [data]);

  const dataOfGroups = [
    ["bun", "Булки"],
    ["sauce", "Соусы"],
    ["main", "Начинки"],
  ];

  const [ingredientOpen, setIngredientOpen] = useState(null);

  const handlerTabClick = (tab) => {
    setCurrent(tab);
    document.querySelector(`#${tab}`).scrollIntoView({ behavior: "smooth" });
  };

  const closeIngredient = () => {
    setIngredientOpen(null);
  };

  const openIngredient = (data) => {
    setIngredientOpen(data);
  };

  return (
    data.length > 0 && (
      <>
        <section className={burgerIngredientsStyles.ingredientsBox}>
          <h1 className="text text_type_main-large mt-10 mb-10">
            Соберите бургер
          </h1>
          <div className={`mb-10 ${burgerIngredientsStyles.tabsPanel}`}>
            {dataOfGroups.map((group) => (
              <Tab
                key={group[0]}
                value={group[0]}
                active={current === group[0]}
                onClick={handlerTabClick}
                text={group[1]}
              >
                {group[1]}
              </Tab>
            ))}
          </div>
          <div className={burgerIngredientsStyles.ingredientsList}>
            {ingredientsGroups.map((group, index) => {
              return (
                <IngredientsCategory
                  categoryId={dataOfGroups[index][0]}
                  categoryName={dataOfGroups[index][1]}
                  group={group.data}
                  ref={group.ref}
                  onCardClick={openIngredient}
                  key={dataOfGroups[index][0]}
                />
              );
            })}
          </div>
        </section>
        {ingredientOpen && (
          <Modal closeModal={closeIngredient} title="Детали ингредиента">
            <IngredientDetails data={ingredientOpen} />
          </Modal>
        )}
      </>
    )
  );
};
