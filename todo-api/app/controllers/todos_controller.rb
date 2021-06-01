class TodosController < ApplicationController
  #skip_before_action :verify_authenticity_token
=begin
  def allow_access
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
    headers['Access-Control-Request-Method'] = '*'
    headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  end
=end

  #include Rails.application.routes.url_helpers

  def index
    @todos = {'data' => Todo.all}
    render json: @todos
  end
  def create
    @todo = Todo.create!(todo_params)
    render json: @todo

    # @todo = Todo.new(todo_params)

    # if @todo.save
    #   render json: @todo
    # else
    #   respond_with_errors @todo
    # end
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
    params.require(:todo).permit(:name, :description, :finished, :created_at, :updated_at, :avatar)#documents: []
  end
end
