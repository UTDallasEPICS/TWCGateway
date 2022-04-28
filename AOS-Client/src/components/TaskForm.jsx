

const TaskForm = () => {
    return (
        <div class="container">
            <form>
                <div class="form-row">
                    <div class="col-md-8 mb-3">
                        <input class="form-control" type="text" 
                            placeholder="Create a new task"/>
                    </div>
                    <div class="col-md-2 mb-3">
                        <input type="date" class="form-control" id="inlineFormInput"
                                    placeholder="Deadline"/>
                    </div>
                    <div class="col-md-2 mb-3">
                        <button type="submit" class="form-control btn btn-primary ">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default TaskForm;

