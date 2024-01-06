import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useDispatch } from 'react-redux';
import { addToTodo,updateTodo } from "./slice";
import { useSelector } from "react-redux";


const Taskform = ({ edit,id }) => {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [priority, setPriority] = useState("");
 const [check, setCheck]=useState(false);

  const todo = useSelector((state) => (id ? state.todos.todo?.find((e) => e.id === id) ?? null : null));

  useEffect(() => {
    if (todo) {
      setTask(todo.task);
      setSelectedTime(todo.selectedTime);
      setPriority(todo.priority);
    }
  }, [id,edit,todo]); 
  

  const toggleGroupItemClasses =
    "hover:bg-violet3 color-mauve11 data-[state=on]:bg-violet6 data-[state=on]:text-violet12 data-[state=on]:border-none flex h-[40px] w-[40px] items-center justify-center bg-white text-base leading-4 first:rounded-l last:rounded-r focus:z-10 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none";

    const addTodo = (event) => {
     if(task===''||priority===''||selectedTime==='')
      {event.preventDefault();
      setCheck(true);
      return;
      }

      else if (id) {
        // If id is present, it's in edit mode
        dispatch(
          updateTodo({
            id,
            task,
            selectedTime,
            priority,
           
          })
        );
      } else {
        // If id is not present, it's in add mode
        dispatch(
          addToTodo({
            id: Date.now().toString(36) + Math.random().toString(36).substr(2),
            task,
            selectedTime,
            priority,
            status:false,
          })
        );
      }
      // Clear the form state
      clearState();
    };
    

  const clearState = () => {
    if(!edit){
    setSelectedTime("");
    setTask("");
    setPriority("");
    setCheck(false);}
  else setCheck(false);
  };
  
 
  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
    
  };

  return (
    <Dialog.Root modal>
      <Dialog.Trigger asChild>
        <button className="text-violet11 shadow-blackA4 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
          <PlusIcon /> {edit ? "Edit Task" : "Add Task"}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content
        onInteractOutside={clearState}
          className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[95vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
        >
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Task
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            {edit
              ? "Make changes to your profile here. Click save when you're done."
              : "Add Your Task"}
          </Dialog.Description>
          <div className="flex justify-center flex-col ">
            <fieldset className="flex items-center gap-5 mt-[10px] mb-5 ">
              <label
                className="text-violet11 text-right text-[15px]"
                htmlFor="task-text"
              >
                Task
              </label>
              <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="task-text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </fieldset>

            <fieldset className="text-violet11 shadow-violet-7 mt-[10px] mb-5 ">
              <label htmlFor="timeInput">Select Time:</label>
              <input
                type="time"
                id="timeInput"
                name="timeInput"
                value={selectedTime}
                onChange={handleTimeChange}
                className="ml-3 filter invert-48 sepia-13 saturate-3207 hue-rotate-130 brightness-95 contrast-80 p-2"
              />
            </fieldset>
            <fieldset className="mt-[10px] mb-5 text-purple ">
  <label htmlFor="priority" className="pr-5 text-purple-800">
    Priority
  </label>
  <ToggleGroup.Root
    className="inline-flex bg-mauve6 rounded shadow-[0_2px_10px] shadow-blackA4 space-x-px"
    id="priority"
    type="single"
    
value={priority}
onValueChange={(value) => {
  if (value) setPriority(value);
}}
    aria-label="Priority"

  >
    <ToggleGroup.Item className={toggleGroupItemClasses} value="High" aria-label="High priority">
     High
    </ToggleGroup.Item>
    <ToggleGroup.Item className={toggleGroupItemClasses} value="Mid" aria-label="Mid priority">
      Mid
    </ToggleGroup.Item>
    <ToggleGroup.Item className={toggleGroupItemClasses} value="Low" aria-label="Low priority">
      Low
    </ToggleGroup.Item>
  </ToggleGroup.Root>
</fieldset>
{check?(<p className="text-red-900 text-sm pb-3 ease-in duration-300">&#42;Please fill in all fields.</p>):''}

          </div>
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button
                onClick={addTodo}
                className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              >
                {edit ? "Save changes" : "Add Task"}
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

Taskform.propTypes = {
  edit: PropTypes.bool,
  id: PropTypes.string,
};

Taskform.defaultProps = {
  edit: false,
  
};

export default Taskform;
