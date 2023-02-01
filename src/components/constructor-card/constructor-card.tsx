import { useRef } from "react";
import burgerConstructorStyles from "../burger-constructor/burger-constructor.module.css";
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrop } from "react-dnd/dist/hooks/useDrop";
import { DropTargetMonitor, useDrag } from 'react-dnd';
import { moveIngredient, deleteIngredient } from "../../services/reduces/burger-constructor";
import { decreaseCount } from "../../services/reduces/burger-ingredients";
import { selectors, useAppDispatch, useAppSelector } from "../..";
import { TIngredient } from "../../services/types/data";

interface IConstCardProps {
  type: string;
  el: TIngredient;
}

export const ConstructorCard: React.FC<IConstCardProps> = ({type, el}) => {

    const dispatch = useAppDispatch();

    const constructorData = useAppSelector(state => state.burgerConstructor.ingredients);

    const delIngredient = (el:TIngredient) => {
      dispatch(deleteIngredient(el.uuid));
      dispatch(decreaseCount(el._id));
    };

    const ref = useRef<HTMLInputElement>(null)
    const [, drop] = useDrop<TIngredient, unknown, {handlerId: string|symbol|null}>({
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
          const hoverY =
            (hoverBoundingRect.bottom - hoverBoundingRect.top) / 4;
          const clientOffset = monitor.getClientOffset();
          const hoverClientTopY = clientOffset!.y - hoverBoundingRect.top;
          const hoverClientBottomY = hoverBoundingRect.bottom - clientOffset!.y;
          if (dragIndex < hoverIndex && hoverClientTopY < hoverY) {
            return;
          }
          if (dragIndex > hoverIndex && hoverClientBottomY > hoverY) {
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
