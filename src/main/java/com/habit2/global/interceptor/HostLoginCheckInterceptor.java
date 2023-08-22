package com.habit2.global.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.servlet.HandlerInterceptor;

public class HostLoginCheckInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String requestURI = request.getRequestURI();
        HttpSession session = request.getSession();

        if (session.getAttribute("s_class").equals("M")) {

            // 호스트 가입으로 redirect
            response.sendRedirect("/host/join?redirectURL=" + requestURI);
            return false;
        }
        return true;
    }
}
