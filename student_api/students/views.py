import string
import random
import datetime
from django.core.mail import send_mail, BadHeaderError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from pymongo import MongoClient
from django.conf import settings
from .serializers import StudentSerializer, RoomSerializer

def generate_password(length=8):
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for i in range(length))

def generate_ssid():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))

class CreateStudentAPIView(APIView):
    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            name = serializer.validated_data['name']
            email = serializer.validated_data['email']
            state = serializer.validated_data['state']

            if state == 'accept':
                ssid = generate_ssid()
                password = generate_password()
                subject = 'Your Student Credentials'
                message = f'Your SSID: {ssid}\nYour Password: {password}'

                try:
                    send_mail(subject, message, settings.EMAIL_HOST_USER, [email])
                except BadHeaderError:
                    return Response({'error': 'Invalid header found.'}, status=status.HTTP_400_BAD_REQUEST)
                except Exception as e:
                    return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                # Store in MongoDB
                client = MongoClient(settings.MONGODB_URI)
                db = client[settings.MONGODB_DB]
                collection = db[settings.MONGODB_COLLECTION]
                collection.insert_one({
                    'name': name,
                    'email': email,
                    'ssid': ssid,
                    'password': password
                })

                return Response({'message': 'Student created and email sent successfully'}, status=status.HTTP_201_CREATED)

            elif state == 'reject':
                subject = 'Application Rejected'
                message = 'We regret to inform you that your application has been rejected.'

                try:
                    send_mail(subject, message, settings.EMAIL_HOST_USER, [email])
                except BadHeaderError:
                    return Response({'error': 'Invalid header found.'}, status=status.HTTP_400_BAD_REQUEST)
                except Exception as e:
                    return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                return Response({'message': 'Rejection email sent successfully'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateRoomAPIView(APIView):
    def post(self, request):
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            room_data = serializer.validated_data
            room_id = room_data['room_id']
            room_name = room_data['room_name']
            subscribers = room_data['subscribers']

            # Store in MongoDB
            client = MongoClient(settings.MONGODB_URI)
            db = client[settings.MONGODB_DB_ROOMS]
            collection = db[settings.MONGODB_COLLECTION_ROOMS]
            collection.insert_one({
                'room_id': room_id,
                'room_name': room_name,
                'subscribers': subscribers
            })

            return Response({'message': 'Room created successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class NotifyRoomSubscribersAPIView(APIView):
    def post(self, request, room_id):
        try:
            client = MongoClient(settings.MONGODB_URI)
            db = client["rooms_db"]
            collection = db[settings.MONGODB_COLLECTION_ROOMS]

            room = collection.find_one({"room_id": room_id})

            if not room:
                return Response({'error': 'Room not found'}, status=status.HTTP_404_NOT_FOUND)

            subject = 'Notification to Alumni Room Subscribers'
            message = 'This is a notification to all subscribers of the alumni room.'
            sender = settings.EMAIL_HOST_USER
            recipient_list = [subscriber['email'] for subscriber in room['subscribers']]

            try:
                send_mail(subject, message, sender, recipient_list)
            except BadHeaderError:
                return Response({'error': 'Invalid header found.'}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({'message': 'Emails sent successfully'}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class FormSubmissionAPIView(APIView):
    def post(self, request):
        data = request.data
        ssid = generate_ssid()
        current_datetime = datetime.datetime.now()

        # Data for form_ngo collection
        form_ngo_data = {
            "name": data.get("name"),
            "gender": data.get("gender"),
            "percentage_12th": data.get("percentage_12th"),
            "college": data.get("college"),
            "stream": data.get("stream"),
            "year_of_scholarship": data.get("year_of_scholarship"),
            "scholarship_amount": data.get("scholarship_amount"),
            "year_of_graduation": data.get("year_of_graduation"),
            "current_occupation": data.get("current_occupation"),
            "state": "Accepted",
            "date_accepted": current_datetime,
            "date_accepted_volunteer": current_datetime,
            "ssid": ssid
        }

        # Data for form_volunteer collection
        form_volunteer_data = {
            "name": data.get("name"),
            "gender": data.get("gender"),
            "percentage_12th": data.get("percentage_12th"),
            "college": data.get("college"),
            "stream": data.get("stream"),
            "year_of_scholarship": data.get("year_of_scholarship"),
            "scholarship_amount": data.get("scholarship_amount"),
            "year_of_graduation": data.get("year_of_graduation"),
            "current_occupation": data.get("current_occupation"),
            "state": "Pending",
            "date_accepted_ngo": current_datetime,
            "ssid": ssid,
            "date_accepted_volunteer": current_datetime
        }

        try:
            client = MongoClient(settings.MONGODB_URI)
            db_ngo = client[settings.MONGODB_DB]
            collection_ngo = db_ngo[settings.MONGODB_COLLECTION_NGO]
            collection_ngo.insert_one(form_ngo_data)

            db_volunteer = client[settings.MONGODB_DB]
            collection_volunteer = db_volunteer[settings.MONGODB_COLLECTION_VOLUNTEER]
            collection_volunteer.insert_one(form_volunteer_data)

            return Response({'message': 'Form submitted successfully'}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UpdateVolunteerStateAPIView(APIView):
    def post(self, request):
        data = request.data
        ssid = data.get('ssid')
        state = data.get('state')
        current_datetime = datetime.datetime.now()

        if state != 'accept':
            return Response({'error': 'Invalid state. Only "accept" is allowed.'}, status=status.HTTP_400_BAD_REQUEST)

        client = MongoClient(settings.MONGODB_URI)
        db = client[settings.MONGODB_DB]
        collection_volunteer = db[settings.MONGODB_COLLECTION_VOLUNTEER]
        collection_trustee = db[settings.MONGODB_COLLECTION_TRUSTEE]

        # Update form_volunteer
        result = collection_volunteer.find_one_and_update(
            {'ssid': ssid},
            {'$set': {'state': 'Accepted', 'date_accepted_volunteer': current_datetime}},
            return_document=True
        )

        if not result:
            return Response({'error': 'Document not found'}, status=status.HTTP_404_NOT_FOUND)

        # Prepare data for form_trustee
        form_trustee_data = result.copy()
        form_trustee_data.pop('_id')  # Remove _id to avoid duplicate key error
        form_trustee_data['state'] = 'Pending'
        form_trustee_data['date_accepted_ngo'] = form_trustee_data.pop('date_accepted_volunteer', current_datetime)

        # Insert into form_trustee
        collection_trustee.insert_one(form_trustee_data)

        return Response({'message': 'State updated and data pushed to form_trustee successfully'}, status=status.HTTP_200_OK)
