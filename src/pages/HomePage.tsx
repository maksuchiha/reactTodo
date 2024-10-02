import {FC} from 'react';
import {TodoLists} from "@components/ui/TodoLists";

type HomePagePropsType = {

}

export const HomePage:FC<HomePagePropsType> = () => {
    return (
        <>
            <TodoLists/>
        </>
    );
}