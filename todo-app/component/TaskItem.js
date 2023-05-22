import styled from "styled-components"
import { TodoButton } from "./Client"

const TaskItem = ({ createdAt, description, title, _id, isCompleted }) => {
    return (
        <>
            <div style={{ width: '80%', backgroundColor: '#dadfe2' }} className="flex rounded-md p-3 my-4 justify-between ">
                <div className="flex items-center">
                    <Span className="">#</Span>
                    <div className="">
                        <div className="">
                            <H4>{title}</H4>
                        </div>
                        <div className="">
                            <p>{description}</p>
                        </div>
                    </div>
                </div>
                <TodoButton  id={_id} completed={isCompleted} />
            </div>
        </>
    )
}

export default TaskItem

const Span = styled.span`
font-size:22px; 
color:black; 
padding:5px;
margin-right:7px;
font-weight:800;
`

const H4 = styled.h4`
    font-size:20px;
    font-weight:700;

`