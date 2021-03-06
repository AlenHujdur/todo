class TodosController < ApplicationController

  def index
    @todos = Todo.all
    render json: @todos.map { |todo|
      if todo.document.attached?
        todo.as_json.merge({ doc_url: rails_blob_path(todo.document, only_path: true), signedId: todo.document.signed_id})
      else
        todo.as_json
      end
      }
  end
  def create
    @todo = Todo.create!(todo_params)
    render json: @todo
  end
  def show
    @todo = Todo.find(params[:id])
    render json: @todo
  end
  def update
    @todo = Todo.find(params[:id])
    @todo.update(todo_params)
    render json: @todo
  end
  def destroy
    @todo = Todo.find(params[:id])
    @todo.destroy
  end

  private
  def todo_params
    params.require(:todo).permit(:name, :description, :finished, :created_at, :updated_at, :document)
  end
end
