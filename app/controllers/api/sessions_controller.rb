module Api
  class SessionsController < ApplicationController
    def create
      @user = User.find_by(username: params[:user][:username])

      puts "@user: #{@user.inspect}"

      if @user && @user.authenticate(params[:user][:password])
        session = @user.sessions.create
        cookies.permanent.signed[:twitter_session_token] = {
          value: session.token,
          httponly: true
        }

        render json: {
          success: true
        }

      else
        render json: {
          success: false
        }
      end
    end

    def authenticated
      token = cookies.signed[:twitter_session_token]
      session = Session.find_by(token: token)

      if session
        @user = session.user
        render json: {
          authenticated: true,
        }, status: :ok
      else
        render json: {
          authenticated: false
        }, status: :bad_request
      end
    end

    def destroy
      token = cookies.signed[:twitter_session_token]
      session = Session.find_by(token: token)

      if session&.destroy
        render json: {
          success: true
        }
      else
        render json: {
          success: false
        }
      end
    end
  end
end
