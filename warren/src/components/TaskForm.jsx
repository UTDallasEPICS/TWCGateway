

const TaskForm = () => {
    return (
        <div>
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
                <input data-provide="datepicker"/>

            </div>
        </div>
    );
}

export default TaskForm;