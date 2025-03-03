import { IoClose } from "react-icons/io5";

// eslint-disable-next-line react/prop-types
const AddFieldComponent = ({close, value, onChange, submit}) => {
  return (
    <section className="fixed top-0 bottom-0 right-0 left-0 bg-neutral-900 bg-opacity-70 flex justify-center items-center z-50 p-4 ">
        <div className="bg-white p-4 rounded w-full max-w-md">
            <div className="flex items-center justify-between gap-3">
                <h1 className="font-semibold">Add Field</h1>
                <button onClick={close} className="w-fit block ml-auto">
                    <IoClose size={25} className="" />
                </button>
            </div>
            <input 
                className="my-3 bg-blue-50 p-2 outline-none border focus-within:border-primary-100 rounded-md w-full"
                placeholder="Enter Field Name"
                value={value}
                onChange={onChange}
            />
            <button
                onClick={submit}
                className="bg-primary-200 hover:bg-primary-100 px-4 py-2 border font-semibold rounded mx-auto w-fit block"
            >Add Field</button>
        </div>
    </section>
  )
}

export default AddFieldComponent
