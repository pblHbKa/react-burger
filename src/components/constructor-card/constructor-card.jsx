import { React, useRef } from "react";
import burgerConstructorStyles from "../burger-constructor/burger-constructor.module.css";
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from "react-dnd/dist/hooks/useDrop";
import { useDrag } from 'react-dnd';
import { moveIngredient, deleteIngredient } from "../../services/reduces/burger-constructor";
import { useDispatch, useSelector } from "react-redux";
import { decreaseCount } from "../../services/reduces/burger-ingredients";


export const ConstructorCard = ({type, el}) => {

    const dispatch = useDispatch();

    const constructorData = useSelector((state) => state.burgerConstructor.data);

    const delIngredient = (el) => {
      dispatch(deleteIngredient(el.uuid));
      dispatch(decreaseCount(el._id));
    };

    const ref = useRef(null)
    const [{ handlerId }, drop] = useDrop({
        accept: "constructorCard",
        collect(monitor) {
          return {
            handlerId: monitor.getHandlerId(),
          }
        },
        hover(item, monitor) {
          if (!ref.current) {
            return;
          }
          const dragIndex = constructorData.indexOf(item);
          const hoverIndex = constructorData.indexOf(el);
          if (dragIndex === hoverIndex || hoverIndex === -1 ) {
            return;
          }
          const hoverBoundingRect = ref.current?.getBoundingClientRect();
          const hoverMiddleY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 4;
          const clientOffset = monitor.getClientOffset();
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;
          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
          }
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
          }
          dispatch(moveIngredient({dragIndex, hoverIndex, item}));
        },
      })
      const [{ isDragging }, drag] = useDrag({
        type: "constructorCard",
        item: () => {
          return el;
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      })
      const opacity = isDragging ? 0 : 1;
      drag(drop(ref));

return (
  <div className={burgerConstructorStyles.constructorElement} ref={ref} draggable>
    <DragIcon type={"primary"} />
    <ConstructorElement
      text={el.name}
      price={el.price}
      thumbnail={el.image}
      handleClose={() => {
        delIngredient(el);
      }}
    />
  </div>
)
};
