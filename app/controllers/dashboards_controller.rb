class DashboardsController < ApplicationController
  include ReactOnRails::Controller

  before_action :set_dashboard, only: [:show, :edit, :update, :destroy, :update_layout, :update_range]
  before_action :initialize_shared_store, only: :show
  skip_before_action :verify_authenticity_token, only: :update_layout

  # GET /dashboards
  # GET /dashboards.json
  def index
    @dashboards = Dashboard.search(params[:search]).order(:name).page params[:page]
  end

  # GET /dashboards/1
  # GET /dashboards/1.json
  def show
  end

  # GET /dashboards/new
  def new
    @dashboard = Dashboard.new
  end

  # GET /dashboards/1/edit
  def edit
  end

  # POST /dashboards
  # POST /dashboards.json
  def create
    @dashboard = Dashboard.new(dashboard_params)

    respond_to do |format|
      if @dashboard.save
        format.html { redirect_to @dashboard, notice: 'Dashboard was successfully created.' }
        format.json { render :show, status: :created, location: @dashboard }
      else
        format.html { render :new }
        format.json { render json: @dashboard.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /dashboards/1
  # PATCH/PUT /dashboards/1.json
  def update
    respond_to do |format|
      if @dashboard.update(dashboard_params)
        format.html { redirect_to @dashboard, notice: 'Dashboard was successfully updated.' }
        format.json { render :show, status: :ok, location: @dashboard }
      else
        format.html { render :edit }
        format.json { render json: @dashboard.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /dashboard/1/layout.json
  def update_layout
    return head :not_modified if @dashboard.locked?
    layout_positions = params[:layout]

    layout_positions.each do |w|
      widget = @dashboard.widgets.find(w[:i])
      widget.update_attributes(row: w[:y], col: w[:x], size_x: w[:w], size_y: w[:h])
    end

    head :ok
  end

  # PUT /dashboard/1/range.json
  def update_range
    return head :not_modified if @dashboard.range.eql?(params[:range])
    @dashboard.update(dashboard_params)
    head :ok
  end

  # DELETE /dashboards/1
  # DELETE /dashboards/1.json
  def destroy
    @dashboard.destroy
    respond_to do |format|
      format.html { redirect_to dashboards_url, notice: 'Dashboard was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def initialize_shared_store
      redux_store(
        'SharedReduxStore',
        props: {
          reloadTimestamp: nil,
          setRange: @dashboard.range
        }
      )
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_dashboard
      @dashboard = Dashboard.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def dashboard_params
      params.require(:dashboard).permit(:name, :theme, :interval, :locked, :range)
    end
end
