from django.contrib import admin
from django.urls import path
from students.views import CreateStudentAPIView, CreateRoomAPIView, NotifyRoomSubscribersAPIView, FormSubmissionAPIView, UpdateVolunteerStateAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/create-student/', CreateStudentAPIView.as_view(), name='create-student'),
    path('api/create-room/', CreateRoomAPIView.as_view(), name='create-room'),
    path('api/notify-room-subscribers/<int:room_id>/', NotifyRoomSubscribersAPIView.as_view(), name='notify-room-subscribers'),
    path('api/form-submission/', FormSubmissionAPIView.as_view(), name='form-submission'),
    path('api/update-volunteer-state/', UpdateVolunteerStateAPIView.as_view(), name='update-volunteer-state'),
]
