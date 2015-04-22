package demo;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CountController {

	private int count = 0;

	@RequestMapping("/")
	public String home() {
		return "count";
	}

	@RequestMapping("count")
	@ResponseBody
	public Map<String, String> count(
			@RequestParam(value = "action") String action,
			@RequestParam(value = "amount", required=false, defaultValue="1") int amount) {

		Map<String, String> response = new HashMap<>();

		
		String value = "";
		if ("add".equals(action)) {
			
			count += amount;
			
			// Beware...this is a string concat...
			value += count;
			
		} else if ("remove".equals(action)) {
			
			count -= amount;

			// Beware...this is a string concat...
			value += count;
			
		} else {
			value = "Say what?  Server don't play dat!";
		}

		response.put("value", value);

		return response;
	}

}