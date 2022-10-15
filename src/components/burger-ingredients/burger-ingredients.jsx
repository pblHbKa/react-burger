import { useState, useMemo } from "react";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/common";
import { Modal } from "../modal/modal";
import { IngredientDetails } from "../ingredient-details/ingredient-details";
import { IngredientsCategory } from "../ingredients-category/ingredients-category";

export const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = useState("bun");

  const ingredientsGroups = useMemo(() => {
    const buns = data.filter((item) => item.type === "bun");
    const mains = data.filter((item) => item.type === "main");
    const sauces = data.filter((item) => item.type === "sauce");

    return [buns, mains, sauces];
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
            {dataOfGroups.map((group) => {
              return (
                <Tab
                  value={group[0]}
                  active={current === group[0]}
                  onClick={handlerTabClick}
                >
                  {group[1]}
                </Tab>
              );
            })}
          </div>
          <div className={burgerIngredientsStyles.ingredientsList}>
            {ingredientsGroups.map((group, index) => {
              return (
                <IngredientsCategory
                  categoryId={dataOfGroups[index][0]}
                  categoryName={dataOfGroups[index][1]}
                  group={group}
                  onCardClick={openIngredient}
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

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientType).isRequired,
};
