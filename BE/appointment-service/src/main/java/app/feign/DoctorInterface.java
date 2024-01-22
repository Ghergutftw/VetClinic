package app.feign;

import app.dto.DoctorResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@FeignClient(name = "doctor-service" , url = "http://localhost:8084/doctor-service" )
public interface DoctorInterface {

    @GetMapping("/get/{id}")
    DoctorResponse getDoctor(@PathVariable int id);

    @GetMapping("/get-by-last-name/{lastName}")
    DoctorResponse getDoctorByLastName(@PathVariable String lastName);

    @PostMapping("/add-appointment/{id}")
    int addAppointment(@PathVariable int id);

}
